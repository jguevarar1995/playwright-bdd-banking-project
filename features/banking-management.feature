Feature: Banking Management

  Background:
    Given user login as "manager"

  @test
  Scenario Outline: Add customer into Banking App
    When add a new customer with:
      | first_name            | last_name            | postal_code            |
      | <customer_first_name> | <customer_last_name> | <customer_postal_code> |
    Then customer is successfully registered
    And customer is found in module

    Examples:
      | customer_first_name | customer_last_name | customer_postal_code |
      | Juan                | Guevara            | 110231               |
      | Pepito              | Pérez              | 06500                |

  @e2e
  Scenario: Open account for a new customer
    And add a new customer with:
      | first_name | last_name | postal_code |
      | Draco      | Malfoy    | EC1Y 8SY    |
    And customer is successfully registered
    When opens an account for customer
    Then customer has been related to an account
