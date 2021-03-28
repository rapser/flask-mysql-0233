# flask-mysql-0233

El proyecto usa mysql como base de datos y jwt para la seguridad

## Instalación

Creamos el entorno virtual e instalamos las dependencias

```sh
$ virtualenv venv
$ source venv/bin/activate
$ pip install -r requirements.txt
```

Si por accidente instalamos las dependencias a python de nuestra mac usamos
```sh
$ pip freeze | xargs pip uninstall -y
```

## Despliegue
Si todo ha sido instalado correctamente usamos

```sh
$ python Backend/app.py
```