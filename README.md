# Simple responsive template
Template use:
<ul>
  <li>gulp</li>
  <li>Responsive grid</li>
  <li>Responsive table</li>
  <li>Responsive menu with 4 type animation dropdown:
		<ul>
			<li>Fold Out</li>
			<li>Slide Down</li>
			<li>Fade In/Out</li>
			<li>Not Animated</li>
		</ul>
  </li>
</ul>

# Usage
Install dependencies through npm:

```bash
npm install
```

Used dependencies:

```json
"dependencies": {
    "gulp-sass": "*",
    "gulp.spritesmith": "*",
    "gulp-autoprefixer": "*",
    "gulp-concat": "*",
    "gulp-minify-css": "*",
    "gulp-rename": "*",
    "gulp-uglify": "*"
  }
```

# Example
For example, set animation type "Slide Down" needs open file "<a href="https://github.com/zualex32/frontend-template/blob/master/build/sass/utils/_variables.scss" >/build/sass/utils/_variables.scss</a>" and change variable $menu-type-animation
