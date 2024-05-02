import requests

# create post request
url = 'http://localhost/server/cart/add.php'
data = {
    'username': 'admin',
    'token': 'mATBtA2AqAJA<AqBjAXBHBRBLAMBCAiBwAVBtAbBAAAAAA4=',
    'pid': 24,
    'amount': 3
}
response = requests.post(url, data=data)
print(response.status_code)