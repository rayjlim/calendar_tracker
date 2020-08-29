#!/archive/data1/bin/php -f
<?php
#
# standalone PHP program
# (edit top line to point to local PHP executable)
#
# Submits GET request to search HST archive for given RA, Dec, and radius,
# limit results to 10 records,
# returns data set name, RA, Dec, and Target name
# as a comma-separated list
# prints out column headings and data
#

# create GET request
require 'backend/SERVER_CONFIG.php';
$request = $ROOT_HTTP."cron";      //quotes url

print "\nrequest = $request \n\n";

$data = file_get_contents($request);

echo $data;
