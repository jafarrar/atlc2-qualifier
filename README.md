atlc-2-qualifier is a [NodeCG](http://github.com/nodecg/nodecg) bundle. 
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `~0.8.0`
You will need to have an appropriate version of NodeCG installed to use it.

# ATLC2 Qualifier

Bundle for use with [NodeCG](http://nodecg.com/) in Amaz Productions' ATLC2 Qualifier. Documentation format borrowed from [NodeCG for Smash](https://github.com/mparkms/nodecg-for-smash).

## How to use

1. Install [git](https://git-scm.com/). Make sure to select 'Use Git from the Windows Command Prompt' if you're on Windows.
2. Install NodeCG as shown in the instructions on the [NodeCG website.](http://nodecg.com/) If it tells you `bower` is not recognized, type in `npm install -g bower`.
3. From this point on, all commands should be in the regular command line, not Node.js. Exit Node.js by hitting ctrl-C twice if you're in Node.js.
4. Install nodecg-cli as shown [here.](https://github.com/nodecg/nodecg-cli)
5. In the command line in the folder you installed NodeCG, enter `nodecg install kegwen/atlc-2-qualifier`
6. Start NodeCG by entering `nodecg start` into command prompt in the folder where NodeCG is installed and go to `localhost:9090` in your browser.
7. Install [OBS Studio](https://obsproject.com/)
8. Add the views listed on the Graphics page at `localhost:9090/dashboard/#!/graphics` as Browser Sources in similarly-named OBS scenes

## Overview of included dashboard panels


## Credits

* [NodeCG](http://nodecg.com/)
* [NodeCG for Smash Documentation](https://github.com/mparkms/nodecg-for-smash)
