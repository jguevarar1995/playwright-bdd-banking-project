Feature: Banking Management

  Background:
    Given user login as "manager"

  @e2e
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
