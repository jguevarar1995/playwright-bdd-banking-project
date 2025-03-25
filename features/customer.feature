@e2e
Feature: Customer

  Background:
    Given user navigates into the banking site

  Scenario: Make an account deposit transaction
    And login as customer with username "<username>"
    When makes a deposit transaction
    Then user balance account has been topped up

    Examples:
      | username         |
      | Hermoine Granger |
      | Harry Potter     |
      | Ron Weasly       |
      | Albus Dumbledore |
