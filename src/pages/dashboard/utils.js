import dummyData from "./data/errors.json";

export const allData = dummyData.map(obj => {
  return {
      ...obj,    
      error_code: `EC_${obj?.error_code}`,
      duration_seconds: Number(obj?.duration_seconds.toFixed(2)),
  };
});

export const uniqueValues = (data, key) => {
    return [...new Set(data.map(item => item[key]))].sort();
};


export const secondsToHms = (d) => {
    d = Number(d);
    if (d==0) {
      return "0 seconds"
    }
    
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
}

// Function to calculate total alarm duration
export const getTotalAlarmDuration = (data) => {
    let alarmDuration = data.reduce((totalDuration, alarm) => {
      return totalDuration + alarm.duration_seconds;
    }, 0);

    return secondsToHms(alarmDuration)
}

// Function to get total count of alarms
export const getTotalCountOfAlarms = (data) => {
    return data.length;
};

// Function to get system with maximum total duration of alarms
export const getSystemWithMaxDurationAlarm = (data) => {
    const systemMap = new Map();
    
    data.forEach(alarm => {
      const { system, duration_seconds } = alarm;
      if (systemMap.has(system)) {
        systemMap.set(system, systemMap.get(system) + duration_seconds);
      } else {
        systemMap.set(system, duration_seconds);
      }
    });
    
    let maxDuration = -1;
    let systemWithMaxDuration = '';
    
    systemMap.forEach((duration, system) => {
      if (duration > maxDuration) {
        maxDuration = duration;
        systemWithMaxDuration = system;
      }
    });
    
    return systemWithMaxDuration;
};

// Function to get timestamp of alarm with maximum duration
export const getMaxDurationAlarmTime = (data) => {
    let maxDuration = -1;

    data.forEach(alarm => {
      if (alarm.duration_seconds > maxDuration) {
        maxDuration = alarm.duration_seconds;
      }
    });

    return secondsToHms(maxDuration);
};


export const getTop10ErrorCodesByTotalDuration = (data) => {
  // Calculate total duration for each alarm error_code
  const errorCodeMap = new Map();
  data.forEach(alarm => {
    const { error_code, duration_seconds } = alarm;
    const codeKey = error_code;

    if (errorCodeMap.has(codeKey)) {
      errorCodeMap.set(codeKey, errorCodeMap.get(codeKey) + duration_seconds);
    } else {
      errorCodeMap.set(codeKey, duration_seconds);
    }
  });

  // Sort error codes by total duration in descending order
  const sortedErrorCodes = [...errorCodeMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Get top 10

  return sortedErrorCodes;
};

export const getTop10ErrorCodesByFrequency = (data) => {
  // Count occurrences of each alarm error_code
  const errorCodeMap = new Map();
  data.forEach(alarm => {
    const { error_code } = alarm;
    const codeKey = error_code;

    if (errorCodeMap.has(codeKey)) {
      errorCodeMap.set(codeKey, errorCodeMap.get(codeKey) + 1);
    } else {
      errorCodeMap.set(codeKey, 1);
    }
  });

  // Sort error codes by frequency in descending order
  const sortedErrorCodes = [...errorCodeMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Get top 10

    return sortedErrorCodes;
};


export const getAlarmTotalDurationByErrorCategory = (data) => {
  // Group total duration by error_category
  const errorCategoryMap = new Map();
  data.forEach(alarm => {
    const { error_category, duration_seconds } = alarm;
    if (errorCategoryMap.has(error_category)) {
      errorCategoryMap.set(error_category, errorCategoryMap.get(error_category) + duration_seconds);
    } else {
      errorCategoryMap.set(error_category, duration_seconds);
    }
  });

  // Extract labels and values for plotly
  const labels = Array.from(errorCategoryMap.keys());
  const values = Array.from(errorCategoryMap.values());

  return { labels, values };
};


export const getAlarmFrequencyByErrorCategory = (data) => {
  // Group total duration by error_category
  const errorCategoryMap = new Map();
  data.forEach(alarm => {
    const { error_category } = alarm;
    if (errorCategoryMap.has(error_category)) {
      errorCategoryMap.set(error_category, errorCategoryMap.get(error_category) + 1);
    } else {
      errorCategoryMap.set(error_category, 1);
    }
  });

  // Extract labels and values for plotly
  const labels = Array.from(errorCategoryMap.keys());
  const values = Array.from(errorCategoryMap.values());

  return { labels, values };
};