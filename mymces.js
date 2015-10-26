// ==UserScript==
// @name         MyMC Enhancement Suite (MyMCES)
// @version      0.1.0
// @icon
// @description  A number of improvements and optimizations for the Montgomery College student portal
// @homepageURL  https://github.com/robojamison/mymces
// @supportURL   https://github.com/robojamison/mymces/issues
// @author       Jamison Bryant
// @copyright    2015, Jamison Bryant (http://jamisonbryant.com)
// @license      MIT License; https://opensource.org/licenses/MIT
// @match        https://mcssb.glb.montgomerycollege.edu/*
// @grant        none
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

$(document).ready(function() {
  /**
   * ------------------------------------------------------------------------------
   * MODULE 1: CO-REQ HIGHLIGHTER
   * ------------------------------------------------------------------------------
   *
   * Certain courses at MC have requirements that you also register for certain
   * other related courses (e.g. when registering for PHYS262 you must also
   * register for PHYS262D and PHYS262L). These are called "co-requisites", or
   * co-reqs for short.
   *
   * MyMC doesn't do a great job of presenting co-req information about a course
   * in that it just gives you the CRN of the co-req and nothing more, which
   * forces you to scroll down the page until you find the CRN you're looking for,
   * which can get old fast.
   *
   * This module will HIGHLIGHT the co-requisites for a course when it is selected
   * (when the checkbox under the "SELECT" column next to the course is checked).
   */
    var $checkboxes = $('input[type=checkbox][name=sel_crn]');
    var $labels = $('span.fieldBlacktextbold');

    $checkboxes.change(function() {
        if ($(this).is(':checked')) {
            // Get rows of interest
            var $allRows = $(this).closest('tbody').children('tr:gt(1)');
            var $courseRow = $(this).closest('tr');
            var $notesRow = $courseRow.next();

            // Parse course notes
            var notes = $notesRow.text();
            var regex = /\d{5}/g;
            var crns = notes.match(regex);
            console.log(crns);

            // Highlight related rows
            $.each($allRows, function(index, row) {
                $crnLink = $(row).find('td:nth-of-type(2) > a');

                if ($.inArray($crnLink.text(), crns) != -1) {
                    $(row).css('background-color', 'yellow');
                }
            });
        } else {
            // Get rows of interest
            var $allRows = $(this).closest('tbody').children('tr:gt(1)');

            // Reset row backgrounds
            $.each($allRows, function(index, row) {
                $(row).css('background-color', 'white');
            });
        }
    });
});
