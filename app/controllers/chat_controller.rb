class ChatController < WebsocketRails::BaseController

  def initialize_session
    p 'Initialize session'
  end

  def message_event
    broadcast_message :message, message
  end

end