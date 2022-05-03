const normalizr = require('normalizr')
const normalize = normalizr.normalize
const schema = normalizr.schema
const util = require('util')

const normalizeSchemaMessage = (originalSchema) => {

    const authorSchema = new schema.Entity('author')
    const messageSchema = new schema.Entity('message', {
        author: authorSchema,
    })
    const messagesSchema = new schema.Entity('messages', {
        messages: [messageSchema]
    })
    const pruebaSchema = new schema.Entity('messages', {
        author: [authorSchema]
    })
    const normalizedMessage = normalize(originalSchema, messagesSchema)
    const obj = normalize(originalSchema, pruebaSchema)

    return normalizedMessage

}

module.exports = { normalizeSchemaMessage }