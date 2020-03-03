# Crypto-Wills

Crypto-Wills use blockchain: technology that stores information in a decentralized form
where information is parceled up in blocks. This decentralized distributed ledger is so 
attractive because of its transparency, security, and resistance to modification, 
transparency and security. If anyone tries to change an entry, the attempt is flagged 
by the system and the authenticity of the attempt is verified.

# How to start
### Running with Vagrant
1. Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. Install [Vagrant](https://www.vagrantup.com/downloads.html)
3. Download and start the Vagrant instance (note: running `vagrant up` takes approx 5 mins):

    ```sh
    cd quorum
    vagrant up
    vagrant ssh
    ```

4. To shutdown the Vagrant instance, run `vagrant suspend`. To delete it, run
   `vagrant destroy`. To start from scratch, run `vagrant up` after destroying the
   instance.

## Starting the 7nodes sample network  
1. Navigate to the 7nodes example directory, configure the Quorum nodes and initialize accounts & keystores:
    ```sh
    cd path/to/7nodes
    ./{consensus}-init.sh
    ```
1. Start the Quorum and privacy manager nodes (Constellation or Tessera):
    - If running in Vagrant:
        ```sh
        ./{consensus}-start.sh
        ```
        By default, Tessera will be used as the privacy manager.  To use Constellation run the following:
        ```
        ./{consensus}-start.sh constellation
        ```

    - If running locally:
        ```
        ./{consensus}-start.sh tessera --tesseraOptions "--tesseraJar /path/to/tessera-app.jar"
        ```
        
        By default, `{consensus}-start.sh` will look in `/home/vagrant/tessera/tessera-app/target/tessera-app-{version}-app.jar` for the Tessera jar.  `--tesseraOptions` must be provided so that the start script looks in the correct location for the Tessera jar: 

        Alternatively, the Tessera jar location can be specified by setting the environment variable `TESSERA_JAR`.

1. You are now ready to start sending private/public transactions between the nodes
Clone or download respository

##Add website and contracts

1. Clone my respository 

    ` git clone https://github.com/MrRav3n/Crypto-Wills.git`

2. Install dependencies

    ` yarn install` or ` npm install`

3. Use yarn start to open your development server

    ` yarn start` or ` npm start`

4. With Metamask connect to proper node (first is http://127.0.0.1:22000 second http://127.0.0.1:22001 eth.)

5. Truffle migrate project

    ` truffle migrate --compile-all --reset`

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[cc-by-sa-4.0](https://creativecommons.org/licenses/by-sa/4.0/)

## Thanks!
Created with help of https://github.com/jpmorganchase/quorum-examples

~MrRav3n
