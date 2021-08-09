## Developing
This project is already pre-configured to easily launch the extension on a local VS Code host. In VS Code, hit the `Run and Debug` icon in the pane to the left and execute the `Run Extension` config.

### Prerequisites
The default package.json version is set to a placeholder string that allows us to easily inject the version during a release. Before launching the local extension host, replace `::release-version::` in the `version` key to something like `1.0.0`.