from rest_framework import serializers
from sensor.models import Sensor

class SensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sensor
        fields = ['valor_sensor', 'fecha_registro']