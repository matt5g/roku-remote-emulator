export default class RokuDevice {
    constructor() {
        this.uuid = '28000000-0000-1000-8000-34f15019eee5';
        this.serial = 'X00000Y4X0MG'
        this.infoXML = `<?xml version="1.0" encoding="UTF-8" ?>
        <device-info>
            <udn>${this.uuid}</udn>
            <serial-number>${this.serial}</serial-number>
            <device-id>NPN23R968563</device-id>
            <advertising-id>846e5f39-5959-5b74-b918-6b198ebb4f13</advertising-id>
            <user-profile-type>adult</user-profile-type>
            <vendor-name>TCL</vendor-name>
            <model-name>32S331</model-name>
            <model-number>8121X</model-number>
            <model-region>US</model-region>
            <is-tv>true</is-tv>
            <is-stick>false</is-stick>
            <screen-size>32</screen-size>
            <panel-id>17</panel-id>
            <mobile-has-live-tv>false</mobile-has-live-tv>
            <ui-resolution>720p</ui-resolution>
            <tuner-type>ATSC</tuner-type>
            <supports-ethernet>false</supports-ethernet>
            <wifi-mac>38:c8:04:c3:03:af</wifi-mac>
            <wifi-driver>realtek</wifi-driver>
            <has-wifi-5G-support>true</has-wifi-5G-support>
            <network-type>wifi</network-type>
            <network-name>Grant 5</network-name>
            <friendly-device-name>Streambox</friendly-device-name>
            <friendly-model-name>TCL•Roku TV</friendly-model-name>
            <default-device-name>TCL•Roku TV - YK00R9968563</default-device-name>
            <user-device-name>Streambox</user-device-name>
            <user-device-location>Bedroom</user-device-location>
            <build-number>48H.04E00853A</build-number>
            <software-version>16.0.4</software-version>
            <software-build>853</software-build>
            <lightning-base-build-number />
            <ui-build-number>48H.04E00853A</ui-build-number>
            <ui-software-version>16.0.4</ui-software-version>
            <ui-software-build>853</ui-software-build>
            <secure-device>true</secure-device>
            <ecp-setting-mode>limited</ecp-setting-mode>
            <ecp-tls-enabled>true</ecp-tls-enabled>
            <truss-enabled>true</truss-enabled>
            <language>en</language>
            <country>US</country>
            <locale>en_US</locale>
            <closed-caption-mode>Instant replay</closed-caption-mode>
            <time-zone-auto>true</time-zone-auto>
            <time-zone>US/Eastern</time-zone>
            <time-zone-name>United States/Eastern</time-zone-name>
            <time-zone-tz>America/New_York</time-zone-tz>
            <time-zone-offset>-300</time-zone-offset>
            <clock-format>12-hour</clock-format>
            <uptime>1238110</uptime>
            <power-mode>PowerOn</power-mode>
            <supports-suspend>false</supports-suspend>
            <supports-find-remote>false</supports-find-remote>
            <supports-audio-guide>true</supports-audio-guide>
            <supports-rva>true</supports-rva>
            <has-hands-free-voice-remote>false</has-hands-free-voice-remote>
            <developer-enabled>false</developer-enabled>
            <keyed-developer-id />
            <device-automation-bridge-enabled>false</device-automation-bridge-enabled>
            <search-enabled>false</search-enabled>
            <search-channels-enabled>false</search-channels-enabled>
            <voice-search-enabled>false</voice-search-enabled>
            <supports-private-listening>false</supports-private-listening>
            <private-listening-blocked>true</private-listening-blocked>
            <supports-private-listening-dtv>false</supports-private-listening-dtv>
            <supports-warm-standby>false</supports-warm-standby>
            <headphones-connected>false</headphones-connected>
            <supports-audio-settings>false</supports-audio-settings>
            <supports-ecs-textedit>true</supports-ecs-textedit>
            <supports-ecs-microphone>false</supports-ecs-microphone>
            <supports-wake-on-wlan>true</supports-wake-on-wlan>
            <supports-airplay>false</supports-airplay>
            <has-play-on-roku>false</has-play-on-roku>
            <has-mobile-screensaver>false</has-mobile-screensaver>
            <support-url>support.tcl.com/us</support-url>
            <grandcentral-version>26.46.14</grandcentral-version>
            <supports-trc>true</supports-trc>
            <trc-version>3.0</trc-version>
            <trc-channel-version>26.40.12</trc-channel-version>
            <av-sync-calibration-enabled>3.0</av-sync-calibration-enabled>
        </device-info>`;

        this.descriptionXML = `<?xml version="1.0"?>
            <root xmlns="urn:schemas-upnp-org:device-1-0">
            <specVersion>
            <major>1</major>
            <minor>0</minor>
            </specVersion>
            <device>
            <deviceType>urn:roku-com:device:player:1-0</deviceType>
            <friendlyName>Streambox</friendlyName>
            <manufacturer>TCL</manufacturer>
            <manufacturerURL>support.tcl.com/us</manufacturerURL>
            <modelDescription>Roku Streaming Player Network Media</modelDescription>
            <modelName>8121X</modelName>
            <modelNumber>8121X</modelNumber>
            <modelURL>http://www.roku.com/</modelURL>
            <serialNumber>${this.serial}</serialNumber>
            <UDN>uuid:${this.uuid}</UDN>
            <iconList>
            <icon>
            <mimetype>image/png</mimetype>
            <width>360</width>
            <height>219</height>
            <depth>8</depth>
            <url>device-image.png</url>
            </icon>
            </iconList>
            <serviceList>
            <service>
            <serviceType>urn:roku-com:service:ecp:1</serviceType>
            <serviceId>urn:roku-com:serviceId:ecp1-0</serviceId>
            <controlURL></controlURL>
            <eventSubURL></eventSubURL>
            <SCPDURL>ecp_SCPD.xml</SCPDURL>
            </service>
            <service>
            <serviceType>urn:dial-multiscreen-org:service:dial:1</serviceType>
            <serviceId>urn:dial-multiscreen-org:serviceId:dial1-0</serviceId>
            <controlURL></controlURL>
            <eventSubURL></eventSubURL>
            <SCPDURL>dial_SCPD.xml</SCPDURL>
            </service>
            </serviceList>
            </device>
            </root>`

        this.appsXML = '<apps></apps>';
        this.mediaPlayerXML = '<player error="false" state="close"></player>'
        this.audioDeviceXML = `<audio-device>
            <global>
                <destination-list>hdmi</destination-list>
            </global>
            <destinations>
                <destination name="hdmi"></destination>
            </destinations>
            </audio-device>`
        this.entityIdentifyXML = `<entity-identify></entity-identify>`
        
    }

    handleKey(key) {
        console.log('Key pressed:', key);
    }

    handleKeyDown(key) {
        console.log('Key down:', key);
    }

    handleKeyUp(key) {
        console.log('Key up:', key);
    }
}