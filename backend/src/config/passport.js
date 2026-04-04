import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "./db.js";

// Estrategia de login social com Google usada como segunda opcao de autenticacao.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const name = profile.displayName;
      const email = profile.emails?.[0]?.value;

      if (!email) {
        return done(new Error("Email do Google nao encontrado."), null);
      }

      // Procura o usuario existente pelo email ou pelo identificador do Google.
      const findUserQuery = "SELECT * FROM users WHERE email = ? OR google_id = ?";

      db.query(findUserQuery, [email, googleId], (err, result) => {
        if (err) return done(err, null);

        if (result.length > 0) {
          return done(null, result[0]);
        }

        // Quando a conta ainda nao existe, cria um novo usuario customer via Google.
        const insertUserQuery = `
          INSERT INTO users (name, email, password_hash, role, google_id)
          VALUES (?, ?, ?, ?, ?)
        `;

        const values = [name, email, null, "customer", googleId];

        db.query(insertUserQuery, values, (insertErr, insertResult) => {
          if (insertErr) return done(insertErr, null);

          const newUser = {
            id: insertResult.insertId,
            name,
            email,
            role: "customer",
            google_id: googleId,
          };

          return done(null, newUser);
        });
      });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
