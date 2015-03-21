class ChatController < WebsocketRails::BaseController

  def initialize_session
    p 'Initialize session'
  end

  def message_event
    message['time'] = Time.now.strftime('%I:%M:%S %p')
    broadcast_message :message, message
  end

  def new_user
    message['time'] = Time.now.strftime('%I:%M:%S %p')
    broadcast_message :new_user, message
  end

end