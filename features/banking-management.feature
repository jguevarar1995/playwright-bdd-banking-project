@e2e
Feature: Banking Management

  Background:
    Given user login as "manager"

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

  Scenario: Attempt to duplicate registered customer
    When add a new customer with:
      | first_name | last_name  | postal_code |
      | Neville    | Longbottom | K1A 0B1     |
    And customer is successfully registered
    And attempts to register the same customer
    Then user should see an alert indicating user already exists
    

  Scenario: Open account for a new customer
    And add a new customer with:
      | first_name | last_name | postal_code |
      | Draco      | Malfoy    | EC1Y 8SY    |
    And customer is successfully registered
    When opens an account for customer
    Then customer has been related to an account

  Scenario: Delete registered customer in Banking App
    And add a new customer with:
      | first_name | last_name | postal_code |
      | Peter      | Pettigrew | Bogotá      |
    And customer is successfully registered
    When deletes the customer information
    Then customer should not see the customer in table
