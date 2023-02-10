Feature: SNS
    Scenario: Create Topic
      Given I have a SNS client
      When I create a topic
      Then I should get a topic ARN

    Scenario: Publish Message
        Given I have a SNS client
        When I publish a message
        Then I should get a message ID

    Scenario: Subscribe
        Given I have a SNS client
        When I subscribe
        Then I should get a subscription ARN

    Scenario: Unsubscribe
        Given I have a SNS client
        When I unsubscribe
        Then I should get a subscription ARN

    Scenario: Delete Topic
        Given I have a SNS client
        When I delete a topic
        Then I should get a topic ARN

    Scenario: List Topics
        Given I have a SNS client
        When I list topics
        Then I should get a list of topics

    Scenario: List Subscriptions
        Given I have a SNS client
        When I list subscriptions
        Then I should get a list of subscriptions

    Scenario: List Subscriptions By Topic
        Given I have a SNS client
        When I list subscriptions by topic
        Then I should get a list of subscriptions by topic

    Scenario: Confirm Subscription
        Given I have a SNS client
        When I confirm subscription
        Then I should get a subscription ARN
