BUILD_VERSION=$(git rev-parse HEAD)
echo $(dirname $0)
echo sed -i -- 's/%BUILD_VERSION%/'$BUILD_VERSION'/g' public/index.html > $(dirname $0)/prebuild.sh
