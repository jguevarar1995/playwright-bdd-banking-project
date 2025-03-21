Feature: Login

  Background:
    Given user navigates into the banking site

  @test
  Scenario: Login as customer
    When login as "customer"
    Then user should see the customer home page

  @e2e
  Scenario Outline: Login as specific customer
    And login as "customer"
    And user should see the customer home page
    When selects "<username>"
    Then user should see his account details

    Examples:
      | username         |
      | Hermoine Granger |
      | Harry Potter     |
      | Ron Weasly       |
      | Albus Dumbledore |
