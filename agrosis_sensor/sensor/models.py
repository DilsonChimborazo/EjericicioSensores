from django.db import models


class Sensor(models.Model):
    valor_sensor = models.FloatField()
    fecha_registro = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return f"{self.valor_sensor} - {self.fecha_registro}"