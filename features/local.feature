Feature: Local form submission test

  Scenario: Submit form successfully
    Given I open "http://localhost:3000"
    When I fill in "name" with "Alice"
    And I fill in "message" with "This is a test message"
    And I click the button with id "btnSubmit"
    Then I should see "Form saved successfully!"
