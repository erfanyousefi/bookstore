import passport from "passport"
import { User } from "../models/users";
import { Strategy as BearerStrategy } from "passport-http-bearer"

export default function () {
    const Bearer = new BearerStrategy(
        async function (token, done) {
            if (!token) return done({ status: 401, message: "Unauthorized" }, null);
            const user = await User.findOne({ token: token })
                .catch(err => { return done({ status: 401, message: "Unauthorized" }, null) })
            if (!user) return done({ status: 401, message: "Unauthorized" }, null);
            done(null, user)
        }
    )
    passport.use(Bearer);
    return {
        initialize: function () {
            return passport.initialize();
        },
        authenticate: function () {
            return passport.authenticate("bearer", { session: false })
        }
    }
}