import os
import csv
import boto3

region = os.environ["AWS_REGION"]
scan_db_table = os.environ["SCAN_TABLE"]
query_db_table = os.environ["QUERY_TABLE"]

reader = csv.DictReader(open('sourceData.csv', newline=""), dialect="excel")
myArr = [dict(row) for row in reader]

my_session = boto3.session.Session(region_name=region)
dynamodb = my_session.resource('dynamodb')
scan_table = dynamodb.Table(scan_db_table)
query_table = dynamodb.Table(query_db_table)

array_of_item=[]
for item in myArr:
    Item={
    'id':item['id'],
    'category':item['Category'],
    'Model':item['Model'],
    'Year':item['Year'],
    'Power HP':item['Power HP'],
    'Fuel consumption liters/100 km':item['Fuel consumption liters/100 km'],
    'Bore mm':item['Bore mm'],
    'Stroke mm':item['Stroke mm'],
    'Top speed km/h':item['Top speed km/h'],
    'Torque Nm':item['Torque Nm'],
    'Rating':item['Rating'],
    'Engine type':item['Engine type'],
    'Fuel system':item['Fuel system'],
    'Fuel control':item['Fuel control'],
    'Cooling system':item['Cooling system'],
    'Gearbox':item['Gearbox'],
    'Transmission type,final drive':item['Transmission type,final drive'],
    'Frame type':item['Frame type'],
    'Rake (fork angle)':item['Rake (fork angle)'],
    'Front suspension':item['Front suspension'],
    'Rear suspension':item['Rear suspension'],
    'Rear wheel travel':item['Rear wheel travel'],
    'Front tyre':item['Front tyre'],
    'Rear tyre':item['Rear tyre'],
    'Front brakes':item['Front brakes'],
    'Rear brakes':item['Rear brakes'],
    'Color options':item['Color options'],
    'Starter':item['Starter'],
    'Comments':item['Comments'],
    'Engine details':item['Engine details'],
    'Compression Ratio':item['Compression Ratio'],
    'Valves per cylinder':item['Valves per cylinder'],
    'Ignition':item['Ignition'],
    'Lubrication system':item['Lubrication system'],
    'Clutch':item['Clutch'],
    'Driveline':item['Driveline'],
    'Greenhouse gases':item['Greenhouse gases'],
    'Emission details':item['Emission details'],
    'Exhaust system':item['Exhaust system'],
    'Wheels':item['Wheels'],
    'Power/weight ratio':item['Power/weight ratio'],
    'Factory warranty':item['Factory warranty'],
    'Electrical':item['Electrical'],
    'Carrying capacity':item['Carrying capacity'],
    'Instruments':item['Instruments'],
    'Light':item['Light'],
    'Max RPM':item['Max RPM'],
    'Seat':item['Seat'],
    'Modifications compared to previous model':item['Modifications compared to previous model'],
    'Front percentage of weight':item['Front percentage of weight'],
    'Rear percentage of weight':item['Rear percentage of weight'],
    'Displacement ccm':item['Displacement ccm'],
    'Displacement cubic inches':item['Displacement cubic inches'],
    'Fuel capacity liters':item['Fuel capacity liters'],
    'Fuel capacity gallons':item['Fuel capacity gallons'],
    'Front wheel travel mm':item['Front wheel travel mm'],
    'Front wheel travel inches':item['Front wheel travel inches'],
    'Dry weight kg':item['Dry weight kg'],
    'Dry weight pounds':item['Dry weight pounds'],
    'Weight incl. oil, gas, etc kg':item['Weight incl. oil, gas, etc kg'],
    'Weight incl. oil, gas, etc pounds':item['Weight incl. oil, gas, etc pounds'],
    'Alternate seat height mm':item['Alternate seat height mm'],
    'Alternate seat height inches':item['Alternate seat height inches'],
    'Oil capacity liters':item['Oil capacity liters'],
    'Oil capacity quarts':item['Oil capacity quarts'],
    'Seat height mm':item['Seat height mm'],
    'Seat height inches':item['Seat height inches'],
    'Compression Enumerator':item['Compression Enumerator'],
    'Fuel consumption km/liter':item['Fuel consumption km/liter'],
    'Fuel consumption miles/gallon':item['Fuel consumption miles/gallon'],
    'Automatic gearbox':item['Automatic gearbox'],
    'Torque kgf-m':item['Torque kgf-m'],
    'Torque ft.lbs':item['Torque ft.lbs'],
    'Torque Benchmark RPM':item['Torque Benchmark RPM'],
    'Bore inches':item['Bore inches'],
    'Stroke inches':item['Stroke inches'],
    'Power kW':item['Power kW'],
    'Power Benchmark RPM':item['Power Benchmark RPM'],
    'Price as new USD':item['Price as new USD'],
    'Price as new Euros':item['Price as new Euros']
}
    array_of_item.append(Item)

with query_table.batch_writer() as batch:
    for i in array_of_item:
        batch.put_item(Item=i)

# print("INSERTED DATA SOURCE IN QUERY TABLE")

with scan_table.batch_writer() as batch:
    for i in array_of_item:
        batch.put_item(Item=i)

print("INSERTED DATA SOURCE IN SCAN TABLE")
