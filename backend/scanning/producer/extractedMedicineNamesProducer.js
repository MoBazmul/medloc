const amqp = require('amqp')

const produceMsg = async(message) => {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()

  const exchange = 'direct_exchange'
  const queue = 'medicineNames'
  const routing_key = '06340f28c1e303dba4944cffb7c982dc'

  await channel.assertExchange(exchange, 'direct', { durable: true })
  await channel.assertQueue(queue)
  await channel.bindQueue(queue, exchange, routing_key)

  channel.publish(exchange, routing_key, Buffer.from(message))
  console.log(`Sent: ${message}`)

  setTimeout(() => {
    connection.close()
  }, 500)
}

module.exports = produceMsg
