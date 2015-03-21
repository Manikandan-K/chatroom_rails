WebsocketRails::EventMap.describe do
     subscribe :client_connected, :to => ChatController, :with_method => :initialize_session
     subscribe :message, :to => ChatController, :with_method => :message_event
     subscribe :new_user, :to => ChatController, :with_method => :new_user
end
