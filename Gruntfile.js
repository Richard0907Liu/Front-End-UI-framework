'use strict';

module.exports = function(grunt){
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //Automatically load required Grunt tasks
    //require('jit-grunt')(grunt);

    // update the jit-grunt configuration as follows,
    // to inform it that useminPrepare task depends on the usemin package:
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });


    //Define the configuration for all the tasks
    grunt.initConfig({
        sass:{
            dist:{
                files:{
                    'css/style.css': 'css/style.scss'
                }
            }
        },

        watch:{
            files: 'css/*.scss',
            tasks:['sass']
        },

        browserSync:{
            dev:{
                bsFiles:{
                    src:[
                        'css/*scss',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options:{
                    watchTask:true,
                    server:{
                        baseDir: "./"
                    }
                }
            }
        },

        copy:{
            html:{
                files:[
                {
                    //for html
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts:{
                files:[
                {
                    //for fornt-awesome
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },

        clean:{
            build:{
                src:['dist/']
            }
        },

        imagemin:{
            dynamic:{
                files:[{
                    expand: true, // enable dynamic expansion
                    cwd: './',      // Src matches are relative to this path
                    src: ['img/*.{png,jpg,gif}'], // Actual patterns to match
                    dest: 'dist/' // Destination path prefix
                }]
            }
        },

        useminPrepare:{
            foo:{
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options:{
                flow:{
                    steps:{
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post:{
                        css:[{
                            name: 'cssmin',
                            createConfig: function(context, block){
                            var generated = context.options.generated;
                                generated.options={
                                    keepSpecialComments: 0, rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        //Concat
        concat:{
            options:{
                separator: ';'
            },
            //dist configuration is provided by useminPrepare
            dist:{}
        },

        //Uglify
        uglify:{
            //dis configuration is provided by useminPrepare
            dist:{}
        },

        cssmin:{
            dist:{}
        },

        //Filerev
        filerev:{
            options:{
                encoding: 'utf-8',
                algorigthm: 'md5',
                length: 20
            },

            release:{
                // filerev: release hashes(md5) all assets (images, js and css)
                // in dist directory
                // alway get newest version of webpages
                files:[{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css', 
                    ]
                }]
            }
        },

        // Usmin, replaces all assests with their revved version in html and 
        // css files. options.assetDirs contains the directories for finding
        // the assests according to their relative paths
        usemin:{
            html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
            options:{
                assetsDirs: ['dist', 'dist/css', 'dist/js']
            }
        },

        htmlmin:{
            dist:{                            // Task  
                options:{                     // Target
                    collapseWhitespace: true  // Target options
                },
                files:{  // Dictionary of files
                    'dist/index.html': 'dist/index.html', // 'destinations': 'source'
                    'dist/contactus.html': 'dist/contactus.html',
                    'dist/aboutus.html': 'dist/aboutus.html',
                }
            }
        }

    });
    // Type npm css and then run sass configuration
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};