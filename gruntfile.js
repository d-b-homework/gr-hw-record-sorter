module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            default: {
                files: [{
                    src: ["./src/**/*.ts"],
                    dest: "./target"
                }],
                options: {
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false,
                    rootDir: "src",
                    noImplicitAny: true,
                    noImplicitReturns: true
                }
            }
        },
        watch: {
            ts: {
                files: ["src/\*\*/\*.ts"],
                tasks: ["ts"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "ts"
    ]);

};
