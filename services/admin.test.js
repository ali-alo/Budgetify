require("dotenv").config();

const testApp = require("./test_server");
const supertest = require("supertest");
const mongoose = require("mongoose");

const User = require("../models/users");
const request = supertest(testApp);
const dbURL = `${process.env.MONGODB_URI}${process.env.DB_TEST_NAME}`;

let token;

// is needed to update and delete a user later
let userId;

beforeAll(async () => {
  // test connection
  await mongoose.connect(
    dbURL,
    () => {
      console.log("Connected to a test database");
    },
    (err) => {
      console.log(err);
    }
  );

  // get jwt token
  const signInResponse = await request
    .post("/sign-in")
    .send({ email: "admin@gmail.com", password: "Tennis!1" });

  token = signInResponse._body;
});

afterAll(async () => {
  // close database connection
  await mongoose.connection.close();

  // don't erase the db, the test was designed to return to the initial state after running all API tests
});

describe("Admin API tests", () => {
  describe("POST: /admin//create-user", () => {
    // authentication is checked at the next section (to avoid testing the same code twice)
    describe("POST: when password is too weak", () => {
      it("should not allow user creation, and display a message about weak password", async () => {
        const response = await request
          .post("/admin/create-user")
          .send({
            name: "Paul",
            surname: "Draslin",
            email: "pauldr@gmail.com",
            country: "USA",
            // password is too simple
            password: "12345",
            passwordConfirm: "12345",
            dob: "1921-12-1",
          })
          .set("Authorization", "Bearer " + token);
        expect(response._body).toContain("Passowrd must be eight or"); // the error message
      });
    });

    describe("POST: when user age is less than 18", () => {
      it("should not allow user creation, and display a message about weak password", async () => {
        const response = await request
          .post("/admin/create-user")
          .send({
            name: "Paul",
            surname: "Draslin",
            email: "pauldr@gmail.com",
            country: "USA",
            password: "asdkjAQQ!#$!32",
            passwordConfirm: "asdkjAQQ!#$!32",
            // too young
            dob: "2004-3-27",
          })
          .set("Authorization", "Bearer " + token);
        expect(response._body).toContain("User validation failed: dob");
      });
    });

    describe("POST: when all the inputs are good", () => {
      it("should add a user to the db", async () => {
        // testing if we the number of documents increases in the db
        const numOfUsersBefore = await User.count();

        const obj = {
          name: "Paul",
          surname: "Draslin",
          email: "pauldr@gmail.com",
          country: "USA",
          password: "asdkjAQQ!#$!32",
          passwordConfirm: "asdkjAQQ!#$!32",
          dob: "1994-3-27",
        };
        const response = await request
          .post("/admin/create-user")
          .send(obj)
          .set("Authorization", "Bearer " + token);

        const numOfUsersAfter = await User.count();
        user = await User.findByEmail(obj.email);
        userId = user._id;

        expect(response._body).toBe(`${obj.name} ${obj.surname} is added`);
        expect(numOfUsersAfter).toBe(numOfUsersBefore + 1);
      });
    });
  });

  describe("GET: /admin/user/:userId", () => {
    it("should return a user from the db based on the id", async () => {
      const response = await request
        .get(`/admin/user/${userId}`)
        .set("Authorization", "Bearer " + token);

      expect(response.body).toMatchObject({
        _id: expect.any(String),
        name: expect.any(String),
        surname: expect.any(String),
        email: expect.any(String),
      });
    });
  });

  describe("GET /admin/view-users", () => {
    describe("GET: when the authentication is not passed", () => {
      it('should not display users, should display "Unauthorized" ', async () => {
        const response = await request.get("/admin/view-users");
        expect(response.status).toBe(401);
        expect(response.text).toBe("Unauthorized");
      });
    });

    describe("GET: when the authentication is passed", () => {
      it("should return the list of users form the db", async () => {
        // please note that you need to create one admin manually in the db to run this test
        const response = await request
          .get("/admin/view-users")
          .set("Authorization", "Bearer " + token);

        expect(response.status).toBe(200);

        // good for a single test
        expect(response.body[0]).toMatchObject({
          _id: expect.any(String),
          name: expect.any(String),
          surname: expect.any(String),
          email: expect.any(String),
        });
        expect(response.header["content-type"]).toBe(
          // to test the db count length of the users before deletion and after
          "application/json; charset=utf-8"
        );
      });
    });
  });

  describe("PUT: /admin/user/:id/edit", () => {
    describe("When all the inputs are good", () => {
      it("should update the user and save the changes", async () => {
        const obj = {
          name: "Vasiliy",
          surname: "Kuznetsov",
          email: "vkuznetsov@gmail.com",
          country: "Uzbekistan",
          password: "Vasiliy Is 4maz!ng",
          passwordConfirm: "Vasiliy Is 4maz!ng",
          dob: "1979-9-24",
        };

        const response = await request
          .put(`/admin/user/${userId}/edit`)
          .send(obj)
          .set("Authorization", "Bearer " + token);

        // test must be able to find a user based on an updated email
        const updatedUser = await User.findByEmail(obj.email);

        expect(updatedUser.name).toBe(obj.name);
        expect(updatedUser.surname).toBe(obj.surname);
        expect(updatedUser.country).toBe(obj.country);
        expect(response._body).toBe(`${obj.name} ${obj.surname} is updated`);
      });
    });

    describe("When one or more of the inputs are not valid", () => {
      it("should not apply any changes to the User schema", async () => {
        // obj does not contain a required name property
        const obj = {
          surname: "TEST",
          email: "something@gmail.com",
          country: "Uzbekistan",
          password: "Vasiliy Is 4maz!ng",
          passwordConfirm: "Vasiliy Is 4maz!ng",
          dob: "1979-9-24",
        };

        const response = await request
          .put(`/admin/user/${userId}/edit`)
          .send(obj)
          .set("Authorization", "Bearer " + token);

        // test must not find a user based on an updated email
        const user = await User.findByEmail(obj.email);

        expect(user).toBe(null);
        expect(response._body).toContain("User validation failed");
      });
    });
  });

  describe("DELETE /admin/user/:idd", () => {
    describe("DELETE: the id does not match the user _id in mongoDB", () => {
      it("should not modify the db", async () => {
        const numOfUsersBefore = await User.count();
        const response = await request
          .delete(`/admin/user/12345`) // there are no users with the id 12345
          .set("Authorization", "Bearer " + token);
        const numOfUsersAfter = await User.count();

        expect(response._body.message).toContain("Cast to ObjectId failed");
        expect(numOfUsersAfter).toBe(numOfUsersBefore);
      });
    });

    describe("DELETE: the id matches user _id in mongoDB", () => {
      it("should delete the user", async () => {
        const numOfUsersBefore = await User.count();
        const response = await request
          .delete(`/admin/user/${userId}`)
          .set("Authorization", "Bearer " + token);
        const numOfUsersAfter = await User.count();
        expect(response._body).toContain("is deleted from the database");
        expect(numOfUsersAfter).toBe(numOfUsersBefore - 1);
      });
    });
  });
});
