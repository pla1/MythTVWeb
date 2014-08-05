#MythTVWeb

### What

MythTV web frontend alternative. Uses [AngularJS](https://angularjs.org/) to display and act on the [MythTV Services API](http://www.mythtv.org/wiki/Services_API). 

### Requirements

* MythTV server version 0.25 or better with services API enabled. 
* Modern browser with Javascript enabled. 

### Features

* Table of your recordings. 
* Download raw recordings. 
* Start, stop, delete or view streams. 
* Table of transcoded streams. 
* Tables are sortable. 
* Recordings table is filterable. 

### User Installation on a Debian based client

1. sudo apt-get install git
2. cd /usr/share/mythtv/html/
3. sudo git clone https://github.com/pla1/MythTVWeb.git

### How to use on any client

Open a modern browser to http://**YourMythTVBackendIPAddress**:6544/MythTVWeb/

### Consuming media on an Android client 

* Watch raw recordings or transcoded streams on your favorite media player like [MX Player](https://play.google.com/store/apps/details?id=com.mxtech.videoplayer.ad&hl=en)
* Watch transcoded streams on [Chrome for Android](https://play.google.com/store/apps/details?id=com.android.chrome&hl=en)
* Throw raw recordings or transcoded streams to an [XBMC](http://xbmc.org/) frontend using [Yatse](https://play.google.com/store/apps/details?id=org.leetzone.android.yatsewidgetfree&hl=en)

### Consuming media on a Linux client

* Download recordings
* Watch raw recordings in [mplayer](https://en.wikipedia.org/wiki/MPlayer), [VLC](https://www.videolan.org), etc...
* Watch transcoded streams in VLC

### Disclaimer

I created this to scratch an itch. It is not an official project of MythTV. 


