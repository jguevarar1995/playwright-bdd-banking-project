@e2e
Feature: Login

  Background:
    Given user navigates into the banking site

  Scenario: Login as manager
    When login as "manager"
    Then user should see the management page

  Scenario Outline: Login as customer with username
    When login as customer with username "<username>"
    Then user should see his account details

    Examples:
      | username         |
      | Hermoine Granger |
      | Harry Potter     |
      | Ron Weasly       |
      | Albus Dumbledore |
