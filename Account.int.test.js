



const Account = require("./Account")
const fs = require("fs")


beforeEach(() => {
    try {
        fs.mkdirSync("accounts")
    } catch {
        //ignore error since folder already exists
    }
    
})

afterEach(() => {
    fs.rmSync("accounts", { recursive: true, force:true })
})

describe(".create", () => {
    test("it creates a new account and file", async () => {
        const name = "Adrian"
        const account = await Account.create(name)
        expect(account.name).toBe(name)
        expect(account.balance).toBe(0)
        expect(fs.readFileSync(account.filePath).toString()).toBe("0")
        //Create an account
        //Check the name is correct
        // Check the balance
        //Check to ensure a file was created
    })
})

describe(".find", () => {
    test("it returns the account", async() => {
        const name = "Adrian"
        const balance = 10
        fs.writeFileSync(`accounts/${name}.txt`, balance.toString())
        const account = await Account.find(name)
        expect(account.name).toBe(name)
        expect(account.balance).toBe(balance)
    })

    describe("where there is no existing account", () => {
        test("it returns undefined", async () => {
            const name = "Adrian"
            const account = await Account.find(name)
            expect(account).toBeUndefined()
        })
    })
})