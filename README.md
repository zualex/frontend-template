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
  <li><a href="https://www.browsersync.io/">Browser-sync</a> - автоматическая перезагрузка страницы при изменении кода</li>
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


# Практика
Запустить сборщик с использованием browser-sync, можно выполнив следующую команду:
```bash
gulp serve
```
<br>
Дождитесь выполнения команды, по завершению в браузере откроется страница `http://localhost:3000/`.<br>
Теперь при изменении файлов `*.html`, `/src/sass/` и `/src/js/`, автоматически произойдет сборка проекта и перезагрузится страница в браузере.<br>
<br>
В папке `src` необходимо писать CSS и JS код, а также загружать изображения для спрайтов.<br>
В папку `dist` сборщик выплевывает готовые файлы.<br>
<br>
Сущестую следующие команды для gulp:<br>
`gulp` - запуск полной сборки проекта.<br>
`gulp watch` - запуск сборки проекта, только при изменении в файлах `/src/sass/` и `/src/js/`.<br>
`gulp serve` - запуск сборки проектас использованием browser-sync.<br>
`gulp js` - объединение и сжатие JS файлов.<br>
`gulp css` - объединение и сжатие css файлов.<br>
`gulp sass` - scss файлы преобразует в css файлы.<br>
`gulp sprite` - генерация спрайтов.<br>
`gulp bower` - получение и объединение стороних JS и CSS файлов.<br>
<br>
Для того чтобы установить тип анимации меню на "Slide Down" нужно в файле "<a href="https://github.com/zualex32/frontend-template/blob/master/build/sass/utils/_variables.scss" >/build/sass/utils/_variables.scss</a>" изменить значение переменной $menu-type-animation на "Slide Down".


