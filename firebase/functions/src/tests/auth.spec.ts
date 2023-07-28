require("mocha");
import * as assert from "assert";
import { auth } from "../firebaseAdmin";
import { UserRecord } from "../types";


const user = {
  displayName: "Test",
  email: "test@example.com",
  password: "testPassword",
  phoneNumber: "+11234567890",
};


describe("User Authentication Tests", () => {
  let userRecord: UserRecord;

  before(async () => {
    userRecord = await auth.createUser({
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    });
  });

  it("should create a user with the correct email", () => {
    assert.strictEqual(userRecord.email, user.email);
  });

  it("should update the user's display name", async () => {
    const newDisplayName: string = "user";
    const updatedUserRecord: UserRecord = await auth.updateUser(userRecord.uid, {
      displayName: newDisplayName,
      email: user.email,
      password: user.password,
    });

    assert.strictEqual(updatedUserRecord.displayName, newDisplayName);
  });

  it("should delete the user successfully", async () => {

    await auth.deleteUser(userRecord.uid);

    try {
      await auth.getUser(userRecord.uid);
      assert.fail("User was not deleted successfully.");
    } catch (error: any) {
      assert.strictEqual(error.code, "auth/user-not-found", "User deletion was not successful.");
    }
  });

  after(async () => {
    // No additional cleanup needed in this case
  });
});
