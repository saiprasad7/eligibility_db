var exists = db.getCollection("users").exists();
if (exists) {
    print("WARNING!!!! Users collection exists, dropping collection!!");
}

db.getCollection("users").drop();
var names = ["user1", "user2", "user3", "user4"];
var toInsert = [];
for (var name of names) {
    if (name.trim()) {
        var item = {
            name: `${name}`,
            email: `${name}@gmail.com`,
            password: `${name}`
        };
        toInsert.push(item);
    }
}

db.getCollection("users").insertMany(toInsert);