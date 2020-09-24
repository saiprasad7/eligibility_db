var dbName = "policies";

var counts = db.getCollection(dbName).count({});
if (counts > 0) {
    print("Policies already initialized. Policy counts: " + counts);
} else {
    //  Policy datastructure
    // policyId -> 1, 2, 3, ...
    // policyName -> policy1, policy2 etc
    // policyBenefits -> policy1 covers upto 50k in hospital expenses
    // claimableAmount -> 50k

    print("Creating 4 policies");

    var bulkInsert = db.getCollection(dbName).initializeUnorderedBulkOp();

    function createPolicies(amounts) {
        for (var i = 1; i <= amounts.length; i++) {
            var id = "000000000" + i.toString();
            var policy = {
                policyId: id,
                policyName: "policy-" + id,
                policyBenefits: `policy-${i} covers upto Rs. ${amounts[i - 1]} in hospital expenses`,
                claimableAmount: amounts[i - 1]
            };
            bulkInsert.insert(policy);
        }
    }

    var claimableAmounts = [50000, 30000, 120000, 60000];
    createPolicies(claimableAmounts);

    bulkInsert.execute();

    print("Policy creation complete");
}