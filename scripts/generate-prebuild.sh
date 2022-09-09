BUILD_VERSION=$(git rev-parse HEAD)
echo sed -i '' -e 's/%BUILD_VERSION%/'$BUILD_VERSION'/g' $(dirname $0)/../public/index.html > $(dirname $0)/prebuild.sh
