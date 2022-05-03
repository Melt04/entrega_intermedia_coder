const normalizr = require('normalizr')
const normalize = normalizr.normalize
const schema = normalizr.schema

const normalizeSchemaMessage = (originalSchema) => {

    const authorSchema = new schema.Entity('author')
    const messageSchema = new schema.Entity('message', {
        author: authorSchema,
    })
    const messagesSchema = new schema.Entity('messages', {
        messages: [messageSchema]
    })
    const normalizedMessage = normalize(originalSchema, messagesSchema)
    return normalizedMessage

}

module.exports = { normalizeSchemaMessage }