const amqp = require('amqp')

const consumeMsg = async() => {
  let consumedMessage
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const exchange = 'direct_exchange'
  const queue = 'medicineNames'
  const routing_key = '06340f28c1e303dba4944cffb7c982dc'

  await channel.assertExchange(exchange, 'direct', { durable: true })
  await channel.assertQueue(queue)
  await channel.bindQueue(queue, exchange, routing_key)

  console.log('Waiting for message....')

  channel.consume(queue, (message) => {
    const content = message.content.toString()
    consumedMessage = content
  }, { noAck: true })

  return consumedMessage
}

module.exports = consumeMsg
