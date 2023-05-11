// This file has been generated by Specta. DO NOT EDIT.

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_store_and_forward_History = { historyMessages: number; window: number; lastRequest: number }

export type app_device_TelemetryPacket = { packet: app_protobufs_MeshPacket; data: app_protobufs_Telemetry }

/**
 * 
 * Unit display preference
 */
export type app_protobufs_config_display_config_DisplayUnits = "metric" | "imperial"

/**
 * 
 * Standard predefined channel settings
 * Note: these mappings must match ModemPreset Choice in the device code.
 */
export type app_protobufs_config_lo_ra_config_ModemPreset = "longFast" | "longSlow" | "veryLongSlow" | "mediumSlow" | "mediumFast" | "shortSlow" | "shortFast" | "longModerate"

/**
 * 
 * Override OLED outo detect with this if it fails.
 */
export type app_protobufs_config_display_config_OledType = "oledAuto" | "oledSsd1306" | "oledSh1106" | "oledSh1107"

/**
 * 
 * Ethernet connection status
 */
export type app_protobufs_EthernetConnectionStatus = { status: app_protobufs_NetworkConnectionStatus | null }

/**
 * 
 * The bluetooth to device link:
 * Old BTLE protocol docs from TODO, merge in above and make real docs...
 * use protocol buffers, and NanoPB
 * messages from device to phone:
 * POSITION_UPDATE (..., time)
 * TEXT_RECEIVED(from, text, time)
 * OPAQUE_RECEIVED(from, payload, time) (for signal messages or other applications)
 * messages from phone to device:
 * SET_MYID(id, human readable long, human readable short) (send down the unique ID
 * string used for this node, a human readable string shown for that id, and a very
 * short human readable string suitable for oled screen) SEND_OPAQUE(dest, payload)
 * (for signal messages or other applications) SEND_TEXT(dest, text) Get all
 * nodes() (returns list of nodes, with full info, last time seen, loc, battery
 * level etc) SET_CONFIG (switches device to a new set of radio params and
 * preshared key, drops all existing nodes, force our node to rejoin this new group)
 * Full information about a node on the mesh
 */
export type app_protobufs_NodeInfo = { num: number; user: app_protobufs_User | null; position: app_protobufs_Position | null; snr: number; lastHeard: number; deviceMetrics: app_protobufs_DeviceMetrics | null; channel: number }

/**
 * 
 * Error codes for critical errors
 * The device might report these fault codes on the screen.
 * If you encounter a fault code, please post on the meshtastic.discourse.group
 * and we'll try to help.
 */
export type app_protobufs_CriticalErrorCode = "none" | "txWatchdog" | "sleepEnterWait" | "noRadio" | "unspecified" | "ubloxUnitFailed" | "noAxp192" | "invalidRadioSetting" | "transmitFailed" | "brownout" | "sx1262Failure" | "radioSpiBug"

/**
 * 
 * Configuration for both device and environment metrics
 */
export type app_protobufs_module_config_TelemetryConfig = { deviceUpdateInterval: number; environmentUpdateInterval: number; environmentMeasurementEnabled: boolean; environmentScreenEnabled: boolean; environmentDisplayFahrenheit: boolean; airQualityEnabled: boolean; airQualityInterval: number }

/**
 * 
 * A packet envelope sent/received over the mesh
 * only payload_variant is sent in the payload portion of the LORA packet.
 * The other fields are either not sent at all, or sent in the special 16 byte LORA header.
 */
export type app_protobufs_MeshPacket = { from: number; to: number; channel: number; id: number; rxTime: number; rxSnr: number; hopLimit: number; wantAck: boolean; priority: number; rxRssi: number; delayed: number; payloadVariant: app_protobufs_mesh_packet_PayloadVariant | null }

/**
 * 
 * 001 - 063 = From Router
 * 064 - 127 = From Client
 */
export type app_protobufs_store_and_forward_RequestResponse = "unset" | "routerError" | "routerHeartbeat" | "routerPing" | "routerPong" | "routerBusy" | "routerHistory" | "routerStats" | "clientError" | "clientHistory" | "clientStats" | "clientPing" | "clientPong" | "clientAbort"

/**
 * 
 * Bluetooth connection status
 */
export type app_protobufs_BluetoothConnectionStatus = { pin: number; rssi: number; isConnected: boolean }

export type app_protobufs_routing_Variant = { routeRequest: app_protobufs_RouteDiscovery } | { routeReply: app_protobufs_RouteDiscovery } | { errorReason: number }

/**
 * 
 * Unique local debugging info for this node
 * Note: we don't include position or the user info, because that will come in the
 * Sent to the phone in response to WantNodes.
 */
export type app_protobufs_MyNodeInfo = { myNodeNum: number; hasGps: boolean; maxChannels: number; firmwareVersion: string; errorCode: number; errorAddress: number; errorCount: number; rebootCount: number; bitrate: number; messageTimeoutMsec: number; minAppVersion: number; airPeriodTx: number[]; airPeriodRx: number[]; hasWifi: boolean; channelUtilization: number; airUtilTx: number }

/**
 * 
 * This message is never sent over the wire, but it is used for serializing DB
 * state to flash in the device code
 * FIXME, since we write this each time we enter deep sleep (and have infinite
 * flash) it would be better to use some sort of append only data structure for
 * the receive queue and use the preferences store for the other stuff
 */
export type app_protobufs_DeviceState = { myNode: app_protobufs_MyNodeInfo | null; owner: app_protobufs_User | null; nodeDb: app_protobufs_NodeInfo[]; receiveQueue: app_protobufs_MeshPacket[]; version: number; rxTextMessage: app_protobufs_MeshPacket | null; noSave: boolean; didGpsReset: boolean }

export type app_protobufs_config_lo_ra_config_RegionCode = "unset" | "us" | "eu433" | "eu868" | "cn" | "jp" | "anz" | "kr" | "tw" | "ru" | "in" | "nz865" | "th" | "lora24" | "ua433" | "ua868"

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_admin_message_PayloadVariant = { getChannelRequest: number } | { getChannelResponse: app_protobufs_Channel } | { getOwnerRequest: boolean } | { getOwnerResponse: app_protobufs_User } | { getConfigRequest: number } | { getConfigResponse: app_protobufs_Config } | { getModuleConfigRequest: number } | { getModuleConfigResponse: app_protobufs_ModuleConfig } | { getCannedMessageModuleMessagesRequest: boolean } | { getCannedMessageModuleMessagesResponse: string } | { getDeviceMetadataRequest: boolean } | { getDeviceMetadataResponse: app_protobufs_DeviceMetadata } | { getRingtoneRequest: boolean } | { getRingtoneResponse: string } | { getDeviceConnectionStatusRequest: boolean } | { getDeviceConnectionStatusResponse: app_protobufs_DeviceConnectionStatus } | { setHamMode: app_protobufs_HamParameters } | { setOwner: app_protobufs_User } | { setChannel: app_protobufs_Channel } | { setConfig: app_protobufs_Config } | { setModuleConfig: app_protobufs_ModuleConfig } | { setCannedMessageModuleMessages: string } | { setRingtoneMessage: string } | { beginEditSettings: boolean } | { commitEditSettings: boolean } | { rebootOtaSeconds: number } | { exitSimulator: boolean } | { rebootSeconds: number } | { shutdownSeconds: number } | { factoryReset: number } | { nodedbReset: number }

/**
 * 
 * Ethernet or WiFi connection status
 */
export type app_protobufs_NetworkConnectionStatus = { ipAddress: number; isConnected: boolean; isMqttConnected: boolean; isSyslogConnected: boolean }

/**
 * 
 * Identify if this is a delayed packet
 */
export type app_protobufs_mesh_packet_Delayed = "noDelay" | "broadcast" | "direct"

/**
 * 
 * Device metadata response
 */
export type app_protobufs_DeviceMetadata = { firmwareVersion: string; deviceStateVersion: number; canShutdown: boolean; hasWifi: boolean; hasBluetooth: boolean; hasEthernet: boolean; role: number; positionFlags: number; hwModel: number }

/**
 * 
 * This information can be encoded as a QRcode/url so that other users can configure
 * their radio to join the same channel.
 * A note about how channel names are shown to users: channelname-X
 * poundsymbol is a prefix used to indicate this is a channel name (idea from @professr).
 * Where X is a letter from A-Z (base 26) representing a hash of the PSK for this
 * channel - so that if the user changes anything about the channel (which does
 * force a new PSK) this letter will also change. Thus preventing user confusion if
 * two friends try to type in a channel name of "BobsChan" and then can't talk
 * because their PSKs will be different.
 * The PSK is hashed into this letter by "0x41 + [xor all bytes of the psk ] modulo 26"
 * This also allows the option of someday if people have the PSK off (zero), the
 * users COULD type in a channel name and be able to talk.
 * FIXME: Add description of multi-channel support and how primary vs secondary channels are used.
 * FIXME: explain how apps use channels for security.
 * explain how remote settings and remote gpio are managed as an example
 */
export type app_protobufs_ChannelSettings = { channelNum: number; psk: number[]; name: string; id: number; uplinkEnabled: boolean; downlinkEnabled: boolean }

export type app_protobufs_XModem = { control: number; seq: number; crc16: number; buffer: number[] }

/**
 * 
 * Log levels, chosen to match python logging conventions.
 */
export type app_protobufs_from_radio_PayloadVariant = { packet: app_protobufs_MeshPacket } | { myInfo: app_protobufs_MyNodeInfo } | { nodeInfo: app_protobufs_NodeInfo } | { config: app_protobufs_Config } | { logRecord: app_protobufs_LogRecord } | { configCompleteId: number } | { rebooted: boolean } | { moduleConfig: app_protobufs_ModuleConfig } | { channel: app_protobufs_Channel } | { queueStatus: app_protobufs_QueueStatus } | { xmodemPacket: app_protobufs_XModem } | { metadata: app_protobufs_DeviceMetadata }

export type app_protobufs_mesh_packet_PayloadVariant = { decoded: app_protobufs_Data } | { encrypted: number[] }

/**
 * 
 * Serial Config
 */
export type app_protobufs_module_config_SerialConfig = { enabled: boolean; echo: boolean; rxd: number; txd: number; baud: number; timeout: number; mode: number }

/**
 * 
 * Packets/commands to the radio will be written (reliably) to the toRadio characteristic.
 * Once the write completes the phone can assume it is handled.
 */
export type app_protobufs_ToRadio = { payloadVariant: app_protobufs_to_radio_PayloadVariant | null }

/**
 * 
 * Preferences for the RangeTestModule
 */
export type app_protobufs_module_config_RangeTestConfig = { enabled: boolean; sender: number; save: boolean }

/**
 * 
 * Broadcast when a newly powered mesh node wants to find a node num it can use
 * Sent from the phone over bluetooth to set the user id for the owner of this node.
 * Also sent from nodes to each other when a new node signs on (so all clients can have this info)
 * The algorithm is as follows:
 * when a node starts up, it broadcasts their user and the normal flow is for all
 * other nodes to reply with their User as well (so the new node can build its nodedb)
 * If a node ever receives a User (not just the first broadcast) message where
 * the sender node number equals our node number, that indicates a collision has
 * occurred and the following steps should happen:
 * If the receiving node (that was already in the mesh)'s macaddr is LOWER than the
 * new User who just tried to sign in: it gets to keep its nodenum.
 * We send a broadcast message of OUR User (we use a broadcast so that the other node can
 * receive our message, considering we have the same id - it also serves to let
 * observers correct their nodedb) - this case is rare so it should be okay.
 * If any node receives a User where the macaddr is GTE than their local macaddr,
 * they have been vetoed and should pick a new random nodenum (filtering against
 * whatever it knows about the nodedb) and rebroadcast their User.
 * A few nodenums are reserved and will never be requested:
 * 0xff - broadcast
 * 0 through 3 - for future use
 */
export type app_protobufs_User = { id: string; longName: string; shortName: string; macaddr: number[]; hwModel: number; isLicensed: boolean }

/**
 * 
 * Parameters for setting up Meshtastic for ameteur radio usage
 */
export type app_protobufs_HamParameters = { callSign: string; txPower: number; frequency: number; shortName: string }

/**
 * 
 * Module Config
 */
export type app_protobufs_ModuleConfig = { payloadVariant: app_protobufs_module_config_PayloadVariant | null }

/**
 * 
 * The priority of this message for sending.
 * Higher priorities are sent first (when managing the transmit queue).
 * This field is never sent over the air, it is only used internally inside of a local device node.
 * API clients (either on the local node or connected directly to the node)
 * can set this parameter if necessary.
 * (values must be <= 127 to keep protobuf field to one byte in size.
 * Detailed background on this field:
 * I noticed a funny side effect of lora being so slow: Usually when making
 * a protocol there isn’t much need to use message priority to change the order
 * of transmission (because interfaces are fairly fast).
 * But for lora where packets can take a few seconds each, it is very important
 * to make sure that critical packets are sent ASAP.
 * In the case of meshtastic that means we want to send protocol acks as soon as possible
 * (to prevent unneeded retransmissions), we want routing messages to be sent next,
 * then messages marked as reliable and finally ‘background’ packets like periodic position updates.
 * So I bit the bullet and implemented a new (internal - not sent over the air)
 * field in MeshPacket called ‘priority’.
 * And the transmission queue in the router object is now a priority queue.
 */
export type app_protobufs_mesh_packet_Priority = "unset" | "min" | "background" | "default" | "reliable" | "ack" | "max"

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_StoreAndForward = { rr: number; variant: app_protobufs_store_and_forward_Variant | null }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_hardware_message_Type = "unset" | "writeGpios" | "watchGpios" | "gpiosChanged" | "readGpios" | "readGpiosReply"

/**
 * 
 * A single edge in the mesh
 */
export type app_protobufs_Neighbor = { nodeId: number; snr: number }

/**
 * 
 * How the GPS coordinates are displayed on the OLED screen.
 */
export type app_protobufs_config_display_config_GpsCoordinateFormat = "dec" | "dms" | "utm" | "mgrs" | "olc" | "osgr"

export type app_ipc_APMincutStringResults = { apResult: number[]; mincutResult: ([number, number])[]; diffcenResult: { [key: number]: { [key: number]: { [key: number]: number } } } }

/**
 * 
 * This message wraps a MeshPacket with extra metadata about the sender and how it arrived.
 */
export type app_protobufs_ServiceEnvelope = { packet: app_protobufs_MeshPacket | null; channelId: string; gatewayId: string }

/**
 * 
 * A Routing control Data packet handled by the routing module
 */
export type app_protobufs_Routing = { variant: app_protobufs_routing_Variant | null }

/**
 * 
 * Shared constants between device and phone
 */
export type app_protobufs_Constants = "zero" | "dataPayloadLen"

/**
 * 
 * RemoteHardwareModule Config
 */
export type app_protobufs_module_config_RemoteHardwareConfig = { enabled: boolean }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_module_config_serial_config_SerialBaud = "baudDefault" | "baud110" | "baud300" | "baud600" | "baud1200" | "baud2400" | "baud4800" | "baud9600" | "baud19200" | "baud38400" | "baud57600" | "baud115200" | "baud230400" | "baud460800" | "baud576000" | "baud921600"

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_admin_message_ConfigType = "deviceConfig" | "positionConfig" | "powerConfig" | "networkConfig" | "displayConfig" | "loraConfig" | "bluetoothConfig"

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_module_config_serial_config_SerialMode = "default" | "simple" | "proto" | "textmsg" | "nmea"

export type app_device_WaypointPacket = { packet: app_protobufs_MeshPacket; data: app_protobufs_Waypoint }

/**
 * 
 * a gps position
 */
export type app_protobufs_Position = { latitudeI: number; longitudeI: number; altitude: number; time: number; locationSource: number; altitudeSource: number; timestamp: number; timestampMillisAdjust: number; altitudeHae: number; altitudeGeoidalSeparation: number; pdop: number; hdop: number; vdop: number; gpsAccuracy: number; groundSpeed: number; groundTrack: number; fixQuality: number; fixType: number; satsInView: number; sensorId: number; nextUpdate: number; seqNumber: number }

/**
 * 
 * Debug output from the device.
 * To minimize the size of records inside the device code, if a time/source/level is not set
 * on the message it is assumed to be a continuation of the previously sent message.
 * This allows the device code to use fixed maxlen 64 byte strings for messages,
 * and then extend as needed by emitting multiple records.
 */
export type app_protobufs_LogRecord = { message: string; time: number; source: string; level: number }

/**
 * 
 * Note: these enum names must EXACTLY match the string used in the device
 * bin/build-all.sh script.
 * Because they will be used to find firmware filenames in the android app for OTA updates.
 * To match the old style filenames, _ is converted to -, p is converted to .
 */
export type app_protobufs_HardwareModel = "unset" | "tloraV2" | "tloraV1" | "tloraV211P6" | "tbeam" | "heltecV20" | "tbeamV0P7" | "techo" | "tloraV11P3" | "rak4631" | "heltecV21" | "heltecV1" | "lilygoTbeamS3Core" | "rak11200" | "nanoG1" | "tloraV211P8" | "tloraT3S3" | "nanoG1Explorer" | "stationG1" | "loraRelayV1" | "nrf52840Dk" | "ppr" | "genieblocks" | "nrf52Unknown" | "portduino" | "androidSim" | "diyV1" | "nrf52840Pca10059" | "drDev" | "m5Stack" | "heltecV3" | "heltecWslV3" | "betafpv2400Tx" | "betafpv900NanoTx" | "privateHw"

export type app_ipc_ConfigurationStatus = { portName: string; successful: boolean; message: string | null }

/**
 * 
 * How the altitude was acquired: manual, GPS int/ext, etc
 * Default: same as location_source if present
 */
export type app_protobufs_position_AltSource = "altUnset" | "altManual" | "altInternal" | "altExternal" | "altBarometric"

export type app_protobufs_x_modem_Control = "nul" | "soh" | "stx" | "eot" | "ack" | "nak" | "can" | "ctrlz"

/**
 * 
 * A message used in our Dynamic Source Routing protocol (RFC 4728 based)
 */
export type app_protobufs_RouteDiscovery = { route: number[] }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_store_and_forward_Variant = { stats: app_protobufs_store_and_forward_Statistics } | { history: app_protobufs_store_and_forward_History } | { heartbeat: app_protobufs_store_and_forward_Heartbeat } | { empty: boolean }

/**
 * 
 * Bit field of boolean configuration options, indicating which optional
 * fields to include when assembling POSITION messages
 * Longitude and latitude are always included (also time if GPS-synced)
 * NOTE: the more fields are included, the larger the message will be -
 * leading to longer airtime and a higher risk of packet loss
 */
export type app_protobufs_config_position_config_PositionFlags = "unset" | "altitude" | "altitudeMsl" | "geoidalSeparation" | "dop" | "hvdop" | "satinview" | "seqNo" | "timestamp" | "heading" | "speed"

/**
 * 
 * Waypoint message, used to share arbitrary locations across the mesh
 */
export type app_protobufs_Waypoint = { id: number; latitudeI: number; longitudeI: number; expire: number; lockedTo: number; name: string; description: string; icon: number }

export type app_protobufs_config_network_config_IpV4Config = { ip: number; gateway: number; subnet: number; dns: number }

export type app_device_MeshNode = { deviceMetrics: app_device_MeshNodeDeviceMetrics[]; environmentMetrics: app_device_MeshNodeEnvironmentMetrics[]; data: app_protobufs_NodeInfo }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_module_config_PayloadVariant = { mqtt: app_protobufs_module_config_MqttConfig } | { serial: app_protobufs_module_config_SerialConfig } | { externalNotification: app_protobufs_module_config_ExternalNotificationConfig } | { storeForward: app_protobufs_module_config_StoreForwardConfig } | { rangeTest: app_protobufs_module_config_RangeTestConfig } | { telemetry: app_protobufs_module_config_TelemetryConfig } | { cannedMessage: app_protobufs_module_config_CannedMessageConfig } | { audio: app_protobufs_module_config_AudioConfig } | { remoteHardware: app_protobufs_module_config_RemoteHardwareConfig }

/**
 * 
 * WiFi connection status
 */
export type app_protobufs_WifiConnectionStatus = { status: app_protobufs_NetworkConnectionStatus | null; ssid: string; rssi: number }

/**
 * 
 * This can be used for customizing the firmware distribution. If populated,
 * show a secondary bootup screen with custom logo and text for 2.5 seconds.
 */
export type app_protobufs_OemStore = { oemIconWidth: number; oemIconHeight: number; oemIconBits: number[]; oemFont: number; oemText: string; oemAesKey: number[]; oemLocalConfig: app_protobufs_LocalConfig | null; oemLocalModuleConfig: app_protobufs_LocalModuleConfig | null }

export type app_protobufs_config_network_config_AddressMode = "dhcp" | "static"

/**
 * 
 * Power Config\
 * See [Power Config](/docs/settings/config/power) for additional power config details.
 */
export type app_protobufs_config_PowerConfig = { isPowerSaving: boolean; onBatteryShutdownAfterSecs: number; adcMultiplierOverride: number; waitBluetoothSecs: number; meshSdsTimeoutSecs: number; sdsSecs: number; lsSecs: number; minWakeSecs: number }

/**
 * 
 * Display Config
 */
export type app_protobufs_config_DisplayConfig = { screenOnSecs: number; gpsFormat: number; autoScreenCarouselSecs: number; compassNorthTop: boolean; flipScreen: boolean; units: number; oled: number; displaymode: number; headingBold: boolean; wakeOnTapOrMotion: boolean }

export type app_device_MeshNodeEnvironmentMetrics = { metrics: app_protobufs_EnvironmentMetrics; timestamp: number }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_admin_message_ModuleConfigType = "mqttConfig" | "serialConfig" | "extnotifConfig" | "storeforwardConfig" | "rangetestConfig" | "telemetryConfig" | "cannedmsgConfig" | "audioConfig" | "remotehardwareConfig"

/**
 * 
 * A failure in delivering a message (usually used for routing control messages, but might be provided in addition to ack.fail_id to provide
 * details on the type of failure).
 */
export type app_protobufs_routing_Error = "none" | "noRoute" | "gotNak" | "timeout" | "noInterface" | "maxRetransmit" | "noChannel" | "tooLarge" | "noResponse" | "dutyCycleLimit" | "badRequest" | "notAuthorized"

/**
 * 
 * Log levels, chosen to match python logging conventions.
 */
export type app_protobufs_to_radio_PayloadVariant = { packet: app_protobufs_MeshPacket } | { wantConfigId: number } | { disconnect: boolean } | { xmodemPacket: app_protobufs_XModem }

/**
 * 
 * Baudrate for codec2 voice
 */
export type app_protobufs_module_config_audio_config_AudioBaud = "codec2Default" | "codec23200" | "codec22400" | "codec21600" | "codec21400" | "codec21300" | "codec21200" | "codec2700" | "codec2700B"

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_ScreenFonts = "fontSmall" | "fontMedium" | "fontLarge"

export type app_protobufs_config_BluetoothConfig = { enabled: boolean; mode: number; fixedPin: number }

export type app_device_ChannelMessageState = "pending" | "acknowledged" | { error: string }

/**
 * 
 * For any new 'apps' that run on the device or via sister apps on phones/PCs they should pick and use a
 * unique 'portnum' for their application.
 * If you are making a new app using meshtastic, please send in a pull request to add your 'portnum' to this
 * master table.
 * PortNums should be assigned in the following range:
 * 0-63   Core Meshtastic use, do not use for third party apps
 * 64-127 Registered 3rd party apps, send in a pull request that adds a new entry to portnums.proto to  register your application
 * 256-511 Use one of these portnums for your private applications that you don't want to register publically
 * All other values are reserved.
 * Note: This was formerly a Type enum named 'typ' with the same id #
 * We have change to this 'portnum' based scheme for specifying app handlers for particular payloads.
 * This change is backwards compatible by treating the legacy OPAQUE/CLEAR_TEXT values identically.
 */
export type app_protobufs_PortNum = "unknownApp" | "textMessageApp" | "remoteHardwareApp" | "positionApp" | "nodeinfoApp" | "routingApp" | "adminApp" | "textMessageCompressedApp" | "waypointApp" | "audioApp" | "replyApp" | "ipTunnelApp" | "serialApp" | "storeForwardApp" | "rangeTestApp" | "telemetryApp" | "zpsApp" | "simulatorApp" | "tracerouteApp" | "neighborinfoApp" | "privateApp" | "atakForwarder" | "max"

/**
 * 
 * Compressed message payload
 */
export type app_protobufs_Compressed = { portnum: number; data: number[] }

export type app_ipc_DeviceBulkConfig = { radio: app_protobufs_LocalConfig | null; module: app_protobufs_LocalModuleConfig | null; channels: app_protobufs_Channel[] | null }

/**
 * 
 * Defines the device's behavior for how messages are rebroadcast
 */
export type app_protobufs_config_device_config_RebroadcastMode = "all" | "allSkipDecoding" | "localOnly"

export type app_protobufs_DeviceConnectionStatus = { wifi: app_protobufs_WifiConnectionStatus | null; ethernet: app_protobufs_EthernetConnectionStatus | null; bluetooth: app_protobufs_BluetoothConnectionStatus | null; serial: app_protobufs_SerialConnectionStatus | null }

/**
 * 
 * How this channel is being used (or not).
 * Note: this field is an enum to give us options for the future.
 * In particular, someday we might make a 'SCANNING' option.
 * SCANNING channels could have different frequencies and the radio would
 * occasionally check that freq to see if anything is being transmitted.
 * For devices that have multiple physical radios attached, we could keep multiple PRIMARY/SCANNING channels active at once to allow
 * cross band routing as needed.
 * If a device has only a single radio (the common case) only one channel can be PRIMARY at a time
 * (but any number of SECONDARY channels can't be sent received on that common frequency)
 */
export type app_protobufs_channel_Role = "disabled" | "primary" | "secondary"

export type app_device_NeighborInfoPacket = { packet: app_protobufs_MeshPacket; data: app_protobufs_NeighborInfo }

export type app_protobufs_telemetry_Variant = { deviceMetrics: app_protobufs_DeviceMetrics } | { environmentMetrics: app_protobufs_EnvironmentMetrics } | { airQualityMetrics: app_protobufs_AirQualityMetrics }

/**
 * 
 * The on-disk saved channels
 */
export type app_protobufs_ChannelFile = { channels: app_protobufs_Channel[]; version: number }

export type app_protobufs_QueueStatus = { res: number; free: number; maxlen: number; meshPacketId: number }

/**
 * 
 * Serial connection status
 */
export type app_protobufs_SerialConnectionStatus = { baud: number; isConnected: boolean }

export type app_protobufs_LocalConfig = { device: app_protobufs_config_DeviceConfig | null; position: app_protobufs_config_PositionConfig | null; power: app_protobufs_config_PowerConfig | null; network: app_protobufs_config_NetworkConfig | null; display: app_protobufs_config_DisplayConfig | null; lora: app_protobufs_config_LoRaConfig | null; bluetooth: app_protobufs_config_BluetoothConfig | null; version: number }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_store_and_forward_Statistics = { messagesTotal: number; messagesSaved: number; messagesMax: number; upTime: number; requests: number; requestsHistory: number; heartbeat: boolean; returnMax: number; returnWindow: number }

/**
 * 
 * This abstraction is used to contain any configuration for provisioning a node on any client.
 * It is useful for importing and exporting configurations.
 */
export type app_protobufs_DeviceProfile = { longName: string | null; shortName: string | null; channelUrl: string | null; config: app_protobufs_LocalConfig | null; moduleConfig: app_protobufs_LocalModuleConfig | null }

export type app_device_MeshDevice = { configId: number; ready: boolean; status: app_device_SerialDeviceStatus; channels: { [key: number]: app_device_MeshChannel }; config: app_protobufs_LocalConfig; moduleConfig: app_protobufs_LocalModuleConfig; myNodeInfo: app_protobufs_MyNodeInfo; nodes: { [key: number]: app_device_MeshNode }; regionUnset: boolean; deviceMetrics: app_protobufs_DeviceMetrics; waypoints: { [key: number]: app_protobufs_Waypoint }; neighbors: { [key: number]: app_device_NeighborInfoPacket }; configInProgress: boolean }

export type app_device_TextPacket = { packet: app_protobufs_MeshPacket; data: string }

/**
 * 
 * Audio Config for codec2 voice
 */
export type app_protobufs_module_config_AudioConfig = { codec2Enabled: boolean; pttPin: number; bitrate: number; i2SWs: number; i2SSd: number; i2SDin: number; i2SSck: number }

/**
 * 
 * Full info on edges for a single node
 */
export type app_protobufs_NeighborInfo = { nodeId: number; lastSentById: number; neighbors: app_protobufs_Neighbor[] }

/**
 * 
 * (Formerly called SubPacket)
 * The payload portion fo a packet, this is the actual bytes that are sent
 * inside a radio packet (because from/to are broken out by the comms library)
 */
export type app_protobufs_Data = { portnum: number; payload: number[]; wantResponse: boolean; dest: number; source: number; requestId: number; replyId: number; emoji: number }

/**
 * 
 * Payload Variant
 */
export type app_protobufs_config_PayloadVariant = { device: app_protobufs_config_DeviceConfig } | { position: app_protobufs_config_PositionConfig } | { power: app_protobufs_config_PowerConfig } | { network: app_protobufs_config_NetworkConfig } | { display: app_protobufs_config_DisplayConfig } | { lora: app_protobufs_config_LoRaConfig } | { bluetooth: app_protobufs_config_BluetoothConfig }

/**
 * 
 * External Notifications Config
 */
export type app_protobufs_module_config_ExternalNotificationConfig = { enabled: boolean; outputMs: number; output: number; outputVibra: number; outputBuzzer: number; active: boolean; alertMessage: boolean; alertMessageVibra: boolean; alertMessageBuzzer: boolean; alertBell: boolean; alertBellVibra: boolean; alertBellBuzzer: boolean; usePwm: boolean; nagTimeout: number }

/**
 * 
 * A pair of a channel number, mode and the (sharable) settings for that channel
 */
export type app_protobufs_Channel = { index: number; settings: app_protobufs_ChannelSettings | null; role: number }

/**
 * 
 * Air quality metrics
 */
export type app_protobufs_AirQualityMetrics = { pm10Standard: number; pm25Standard: number; pm100Standard: number; pm10Environmental: number; pm25Environmental: number; pm100Environmental: number; particles03Um: number; particles05Um: number; particles10Um: number; particles25Um: number; particles50Um: number; particles100Um: number }

export type app_device_ChannelMessageWithState = { payload: app_device_ChannelMessagePayload; state: app_device_ChannelMessageState }

/**
 * 
 * This is the most compact possible representation for a set of channels.
 * It includes only one PRIMARY channel (which must be first) and
 * any SECONDARY channels.
 * No DISABLED channels are included.
 * This abstraction is used only on the the 'app side' of the world (ie python, javascript and android etc) to show a group of Channels as a (long) URL
 */
export type app_protobufs_ChannelSet = { settings: app_protobufs_ChannelSettings[]; loraConfig: app_protobufs_config_LoRaConfig | null }

/**
 * 
 * Canned message module configuration.
 */
export type app_protobufs_RtttlConfig = { ringtone: string }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_module_config_canned_message_config_InputEventChar = "none" | "up" | "down" | "left" | "right" | "select" | "back" | "cancel"

/**
 * 
 * MQTT Client Config
 */
export type app_protobufs_module_config_MqttConfig = { enabled: boolean; address: string; username: string; password: string; encryptionEnabled: boolean; jsonEnabled: boolean; tlsEnabled: boolean; root: string }

/**
 * 
 * Position Config
 */
export type app_protobufs_config_PositionConfig = { positionBroadcastSecs: number; positionBroadcastSmartEnabled: boolean; fixedPosition: boolean; gpsEnabled: boolean; gpsUpdateInterval: number; gpsAttemptTime: number; positionFlags: number; rxGpio: number; txGpio: number; broadcastSmartMinimumDistance: number; broadcastSmartMinimumIntervalSecs: number }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_store_and_forward_Heartbeat = { period: number; secondary: number }

export type app_device_PositionPacket = { packet: app_protobufs_MeshPacket; data: app_protobufs_Position }

/**
 * 
 * An example app to show off the module system. This message is used for
 * REMOTE_HARDWARE_APP PortNums.
 * Also provides easy remote access to any GPIO.
 * In the future other remote hardware operations can be added based on user interest
 * (i.e. serial output, spi/i2c input/output).
 * FIXME - currently this feature is turned on by default which is dangerous
 * because no security yet (beyond the channel mechanism).
 * It should be off by default and then protected based on some TBD mechanism
 * (a special channel once multichannel support is included?)
 */
export type app_protobufs_HardwareMessage = { type: number; gpioMask: string; gpioValue: string }

export type app_device_UserPacket = { packet: app_protobufs_MeshPacket; data: app_protobufs_User }

export type app_device_ChannelMessagePayload = ({ type: "text" } & app_device_TextPacket) | ({ type: "waypoint" } & app_device_WaypointPacket)

/**
 * 
 * Log levels, chosen to match python logging conventions.
 */
export type app_protobufs_log_record_Level = "unset" | "critical" | "error" | "warning" | "info" | "debug" | "trace"

/**
 * 
 * Types of Measurements the telemetry module is equipped to handle
 */
export type app_protobufs_Telemetry = { time: number; variant: app_protobufs_telemetry_Variant | null }

export type app_protobufs_config_display_config_DisplayMode = "default" | "twocolor" | "inverted" | "color"

export type app_protobufs_Config = { payloadVariant: app_protobufs_config_PayloadVariant | null }

/**
 * 
 * Packets from the radio to the phone will appear on the fromRadio characteristic.
 * It will support READ and NOTIFY. When a new packet arrives the device will BLE notify?
 * It will sit in that descriptor until consumed by the phone,
 * at which point the next item in the FIFO will be populated.
 */
export type app_protobufs_FromRadio = { id: number; payloadVariant: app_protobufs_from_radio_PayloadVariant | null }

export type app_protobufs_config_bluetooth_config_PairingMode = "randomPin" | "fixedPin" | "noPin"

export type app_protobufs_LocalModuleConfig = { mqtt: app_protobufs_module_config_MqttConfig | null; serial: app_protobufs_module_config_SerialConfig | null; externalNotification: app_protobufs_module_config_ExternalNotificationConfig | null; storeForward: app_protobufs_module_config_StoreForwardConfig | null; rangeTest: app_protobufs_module_config_RangeTestConfig | null; telemetry: app_protobufs_module_config_TelemetryConfig | null; cannedMessage: app_protobufs_module_config_CannedMessageConfig | null; audio: app_protobufs_module_config_AudioConfig | null; remoteHardware: app_protobufs_module_config_RemoteHardwareConfig | null; version: number }

/**
 * 
 * Network Config
 */
export type app_protobufs_config_NetworkConfig = { wifiEnabled: boolean; wifiSsid: string; wifiPsk: string; ntpServer: string; ethEnabled: boolean; addressMode: number; ipv4Config: app_protobufs_config_network_config_IpV4Config | null; rsyslogServer: string }

/**
 * 
 * Store and Forward Module Config
 */
export type app_protobufs_module_config_StoreForwardConfig = { enabled: boolean; heartbeat: boolean; records: number; historyReturnMax: number; historyReturnWindow: number }

/**
 * 
 * Canned message module configuration.
 */
export type app_protobufs_CannedMessageModuleConfig = { messages: string }

/**
 * 
 * Key native device metrics such as battery level
 */
export type app_protobufs_DeviceMetrics = { batteryLevel: number; voltage: number; channelUtilization: number; airUtilTx: number }

/**
 * 
 * TODO: REPLACE
 */
export type app_protobufs_module_config_CannedMessageConfig = { rotary1Enabled: boolean; inputbrokerPinA: number; inputbrokerPinB: number; inputbrokerPinPress: number; inputbrokerEventCw: number; inputbrokerEventCcw: number; inputbrokerEventPress: number; updown1Enabled: boolean; enabled: boolean; allowInputSource: string; sendBell: boolean }

export type app_device_SerialDeviceStatus = "restarting" | "disconnected" | "connecting" | "reconnecting" | "connected" | "configuring" | "configured"

/**
 * 
 * Supported I2C Sensors for telemetry in Meshtastic
 */
export type app_protobufs_TelemetrySensorType = "sensorUnset" | "bme280" | "bme680" | "mcp9808" | "ina260" | "ina219" | "bmp280" | "shtc3" | "lps22" | "qmc6310" | "qmi8658" | "qmc5883L" | "sht31" | "pmsa003I"

/**
 * 
 * This message is handled by the Admin module and is responsible for all settings/channel read/write operations.
 * This message is used to do settings operations to both remote AND local nodes.
 * (Prior to 1.2 these operations were done via special ToRadio operations)
 */
export type app_protobufs_AdminMessage = { payloadVariant: app_protobufs_admin_message_PayloadVariant | null }

export type app_device_MeshNodeDeviceMetrics = { metrics: app_protobufs_DeviceMetrics; timestamp: number }

/**
 * 
 * How the location was acquired: manual, onboard GPS, external (EUD) GPS
 */
export type app_protobufs_position_LocSource = "locUnset" | "locManual" | "locInternal" | "locExternal"

/**
 * 
 * Weather station or other environmental metrics
 */
export type app_protobufs_EnvironmentMetrics = { temperature: number; relativeHumidity: number; barometricPressure: number; gasResistance: number; voltage: number; current: number }

/**
 * 
 * Configuration
 */
export type app_protobufs_config_DeviceConfig = { role: number; serialEnabled: boolean; debugLogEnabled: boolean; buttonGpio: number; buzzerGpio: number; rebroadcastMode: number; nodeInfoBroadcastSecs: number; doubleTapAsButtonPress: boolean }

/**
 * 
 * Lora Config
 */
export type app_protobufs_config_LoRaConfig = { usePreset: boolean; modemPreset: number; bandwidth: number; spreadFactor: number; codingRate: number; frequencyOffset: number; region: number; hopLimit: number; txEnabled: boolean; txPower: number; channelNum: number; overrideDutyCycle: boolean; sx126XRxBoostedGain: boolean; overrideFrequency: number; ignoreIncoming: number[] }

/**
 * 
 * Defines the device's role on the Mesh network
 */
export type app_protobufs_config_device_config_Role = "client" | "clientMute" | "router" | "routerClient" | "repeater" | "tracker" | "sensor"

export type app_device_MeshChannel = { config: app_protobufs_Channel; lastInteraction: number; messages: app_device_ChannelMessageWithState[] }
