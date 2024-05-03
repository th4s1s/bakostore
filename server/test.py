import requests

# create post request
url = 'http://localhost/btl-web/server/cart/update.php'
data = {
    'username': 'admin',
    'token': 'mATBtA2AqAJA<AqBjAXBHBRBLAMBCAiBwAVBtAbBAAAAAA4=',
    'pid': 1,
    'amount': 10
}
response = requests.post(url, data=data)
print(response.status_code)