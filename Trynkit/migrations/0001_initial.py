# Generated by Django 3.0.2 on 2020-02-09 02:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('username', models.CharField(max_length=50, primary_key=True, serialize=False, unique=True)),
                ('password', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=100, unique=True)),
                ('file1name', models.CharField(max_length=50, null=True)),
                ('file1', models.BinaryField(default=b'', max_length=100)),
                ('file2name', models.CharField(max_length=50, null=True)),
                ('file2', models.BinaryField(default=b'', max_length=100)),
                ('file3name', models.CharField(max_length=50, null=True)),
                ('file3', models.BinaryField(default=b'', max_length=100)),
                ('file4name', models.CharField(max_length=50, null=True)),
                ('file4', models.BinaryField(default=b'', max_length=100)),
                ('file5name', models.CharField(max_length=50, null=True)),
                ('file5', models.BinaryField(default=b'', max_length=100)),
            ],
        ),
    ]
