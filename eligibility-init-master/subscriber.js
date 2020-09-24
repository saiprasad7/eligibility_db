var dbName = "subscribers";

var counts = db.getCollection(dbName).count({});
var policyCounts = db.getCollection("policies").count({});

if (counts > 0) {
    print("Subscribers already initialized. Counts: " + counts);
} else if (policyCounts == 0) {
    print("Initialize policies before setting subscribers. Counts: " + policyCounts);
} else {
    // Subscriber data structure
    //  subscriberId -> String 01, 02 etc
    //  name -> compound object, keys -> firstName, lastName
    //  email -> string
    //  password -> string (Ideally, should be obfuscated)
    //  authenticationToken -> string (might be useful for auth)
    //  dateOfBirth -> Date value
    //  address -> compound object, keys -> street, city, state, country
    //  benefits -> list of compound objects, keys -> policyId, policyBenefits, totalEligibleAmount, claimedAmount, currentEligibleAmount
    //  dependents -> list of objects, keys -> dependentId (01-01, 01-02,...), dependentName -> firstName, lastName, dependentDateOfBirth, dependentAddress -> street, city, state, country, dependentBenefits -> policyId, policyBenefits, totalEligibleAmount, claimedAmount, currentEligibileAmount

    print("Creating subscribers");

    var addresses = [
        { street: "Bagrodia Street", city: "New Delhi", state: "Delhi", country: "India" },
        { street: "Modern Street", city: "Chennai", state: "Tamil Nadu", country: "India" },
        { street: "Convent street", city: "Detroit", state: "Michigan", country: "USA" },
        { street: "Kaiser street", city: "Berlin", state: "Berlin", country: "Germany" }
    ];

    var firstNames = ["Ganishka", "Venkat", "Victoria", "Lisa"];
    var lastNames = ["Sundar", "Gururajan", "Miller", "Brunner"];

    var names = [];
    for (var j = 0; j < firstNames.length; j++) {
        var name = {
            firstName: firstNames[j],
            lastName: lastNames[j]
        };
        names.push(name);
    }

    var subscriberIds = ["0000000001", "0000000002", "0000000003", "0000000004"];

    var dateOfBirths = ["1982-02-01", "1983-03-06", "1967-11-25", "1980-08-11"];

    var benefits = db.getCollection("policies").find({});
    var maxCounts = 4;

    var bulk = db.getCollection(dbName).initializeUnorderedBulkOp();
    for (var i = 0; i < maxCounts; i++) {
        var randomIdx = Math.floor(Math.random() * maxCounts);
        var benefit = benefits[i];
        benefit.totalEligibleAmount = benefit.claimableAmount;
        benefit.claimableAmount = null;
        benefit.claimedAmount = i * 1000;
        benefit.currentEligibleAmount = benefit.totalEligibleAmount - i * 1000;
        delete benefit.claimableAmount;

        var subscriber = {
            subscriberId: subscriberIds[i],
            name: names[i],
            address: addresses[i],
            email: firstNames[i] + "@gmail.com",
            password: firstNames[i],
            authenticationToken: "None",
            dateOfBirth: new Date(dateOfBirths[i]),
            benefits: [benefit],
            dependents: [
                {
                    dependentId: subscriberIds[i] + "0000000001",
                    dependentName: { firstName: firstNames[randomIdx], lastName: lastNames[randomIdx] },
                    dependentDateOfBirth: new Date(dateOfBirths[randomIdx]),
                    dependentAddress: addresses[i],
                    dependentBenefits: [benefit],
                }
            ]
        }
        bulk.insert(subscriber);
    }

    bulk.execute();

    print("Subscribers created successfully");
}