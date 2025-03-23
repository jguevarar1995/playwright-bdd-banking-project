Feature: Banking Management

  Background:
    Given user login as "manager"

  @test
  Scenario Outline: Add customer into Banking App
    When add a new customer with:
      | first_name            | last_name            | postal_code            |
      | <customer_first_name> | <customer_last_name> | <customer_postal_code> |
    Then user is successfully registered

    Examples:
      | customer_first_name | customer_last_name | customer_postal_code |
      | Juan                | Guevara            | 110231               |
      | Pepito              | Pérez              | 06500                |
