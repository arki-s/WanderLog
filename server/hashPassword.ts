import bcrypt from "bcryptjs";

//npx ts-node hashPassword.ts　で入力したテストパスワードをハッシュ化

const testPassword = "";

bcrypt.hash(testPassword, 10, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed password:", hash);
  }
});
