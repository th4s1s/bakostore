import requests

# create post request
url = 'http://localhost/btl-web/server/cart/purchase.php'
data = {
    'username': 'admin',
    'token': 'mATBtA2AqAJA<AqBjAXBHBRBLAMBCAiBwAVBtAbBAAAAAA4=',
    'address': 'Hanoi, Vietnam',
    'phone': '0123456789',
    'ship': 69000
}
response = requests.post(url, data=data)
print(response.status_code)