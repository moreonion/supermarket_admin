# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.require_version ">= 1.6.5"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "debian-stretch"
  config.vm.box_url = "https://boxen.more-onion.com/debian-stretch.json"
  config.vm.box_version = "9.2"
  config.vm.box_download_insecure = false
  config.vm.box_check_update = false

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "vagrant/playbook.yml"
  end

  # Nuxt
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.synced_folder ".", "/home/vagrant/hostdir", nfs: false

  config.vm.provider "virtualbox" do |v|
    v.customize ["modifyvm", :id, "--cpus", 2]
  end
end
