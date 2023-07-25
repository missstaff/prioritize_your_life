import { auth } from "../firebaseAdmin";
import * as assert from "assert";
import { UserRecord } from "../types";

const numTests = 3;
let numTestsPassed = 0;

const user = {
  displayName: "Test",
  email: "test@example.com",
  password: "testPassword",
  phoneNumber: "+11234567890", // E.164 format, ~ needs to get country code 
};


const testCreateUser = async () => {
  try {

    const userRecord: UserRecord = await auth.createUser({
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber
    });

    assert.strictEqual(userRecord.email, user.email);
    numTestsPassed++;

    console.log("✅ User creation test passed.");
    return userRecord.uid;

  } catch (error) {
    assert.fail("⛔️ User creation test failed:", error);
  }
  return null;
}

const testUpdateUser = async () => {
  try {

    const userRecord: UserRecord = await auth.getUserByEmail(user.email);
    const uid: string | any = userRecord?.uid || null;

    if (!uid) {
      assert.fail("⛔️ User update test failed: uid is null");
    }

    const newDisplayName: string = "user"
    const updatedUserRecord: UserRecord = await auth.updateUser(uid, {
      displayName: newDisplayName,
      email: user.email,
      password: user.password,
    });

    assert.strictEqual(updatedUserRecord.displayName, newDisplayName);
    console.log("✅ User update test passed.");
    numTestsPassed++;
  } catch (error) {
    assert.fail("⛔️ User update test failed:", error);
  }
};


const testDeleteUser = async () => {
  try {
    const userRecord: UserRecord = await auth.getUserByEmail(user.email);
    const uid: string | any = userRecord?.uid || null;

    if (!uid) {
      assert.fail("⛔️ User delete test failed: uid is null");
    }

    await auth.deleteUser(uid);
    console.log("✅ User deletion test passed.");
    numTestsPassed++;
  } catch (error) {
    assert.fail("⛔️ User deletion test failed:", error);
  }
};

export const authTests = async () => {
  await testCreateUser();
  await testUpdateUser();
  await testDeleteUser();
  console.log(`Passed: ${numTestsPassed} out of ${numTests}`);
  console.log(`Failed: ${numTests - numTestsPassed}`);
};
