# Простой адаптивный шаблон
В шаблоне используются адаптивные:
<ul>
  <li>Cетка из 12 колонок</li>
  <li>Таблица</li>
  <li>Меню с 4 типами анимации:
		<ul>
			<li>Fold Out</li>
			<li>Slide Down</li>
			<li>Fade In/Out</li>
			<li>Not Animated</li>
		</ul>
  </li>
</ul>

Также в шаблоне применяются:
<ul>
  <li><a href="http://gulpjs.com/">Gulp</a></li>
  <li><a href="http://bower.io/">Bower</a></li>
  <li><a href="http://sass-lang.com/">Sass</a></li>
  <li><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></li>
  <li>Объединение и сжатие CSS и JS</li>
  <li>Объединение изображений в спрайт</li>
  <li><a href="http://sass-guidelin.es/ru/">Руководство по написанию разумного, поддерживаемого и масштабируемого Sass</a></li>
</ul>

# Начало
Для того чтобы использовать данный шаблон, необходим установленный <a href="https://nodejs.org">Node.JS<a>.
Установить все нужные пакеты можно через npm, выполнив следующую команду:

```bash
npm install
```

Далее необходимо установить сторонние библиотеки, выполнив следующую команду:

```bash
bower install
```

Для того чтобы запустить сборку gulp, выполните следующую команду:
```bash
gulp
```

Для того чтобы сборка запускалась автоматичеки при изменении файлов, выполните следующую команду:
```bash
gulp watch
```
`Сборка проекта происходит при изменении файлов в "/src/sass/" и "/src/js/" `



# Практика
<ul>
  <li>В папке `src` необходимо писать CSS и JS код, а также загружить изображения для спрайтов.<br>
В папку `dist` сборщик выплевывает готовые файлы.
  </li>
  <li>Для того чтобы установить тип анимации меню на "Slide Down" нужно в файле "<a href="https://github.com/zualex32/frontend-template/blob/master/build/sass/utils/_variables.scss" >/build/sass/utils/_variables.scss</a>" изменить значение переменной $menu-type-animation на "Slide Down".</li>
</ul>

