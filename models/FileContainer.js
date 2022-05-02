const fs = require('fs/promises')
class FileContainer {
    constructor(fileRoute) {
        this.fileRoute = fileRoute
    }
    async connect() { }
    async getAll() {
        try {
            const data = await fs.readFile(this.fileRoute)
            if (data.length > 0) {
                const parsedData = JSON.parse(data)
                return parsedData
            }
            return new Array()
        } catch (e) {
            throw new Error(e.message)
        }
    }

    async insert(data) {
        try {

            const allData = await this.getAll()
            allData.push(data)
            const insertedData = await fs.writeFile(this.fileRoute, JSON.stringify(allData))
            return insertedData
        } catch (e) {
            throw new Error(e.message)
        }
    }
    async getById(id) {
        try {
            const allData = await this.getAll()
            if (allData.length == 0) return undefined
            const findData = allData.find((data) => data.id == id)

            return findData
        } catch (e) {
            throw new Error(e.message)
        }
    }
    async deleteById(id) {
        try {
            const allData = await this.getAll()
            if (allData.length == 0) return undefined
            const newData = allData.filter((data) => data.id != id)
            return await fs.writeFile(this.fileRoute, JSON.stringify(newData))


        } catch (e) {
            throw new Error(e.message)
        }
    }
    async updateById(id, newData) {
        try {
            const data = await this.getAll()
            const newProduct = data.map(element => {
                if (element.id == id) {
                    element = { ...element, ...newData }
                } return element
            })

            return await fs.writeFile(this.fileRoute, JSON.stringify(newProduct))

        } catch (e) {
            throw new Error(e.message)
        }

    }
    async deleteAll() {
        try {
            await fs.writeFile(this.fileRoute, JSON.stringify([]))
        } catch (e) {
            throw new Error(e.message)
        }
    }
}
module.exports = FileContainer