goog.provide("sc.measurements.Distance");
goog.scope(function ()
{
	var Distance = sc.measurements.Distance;

	Distance.KMH_MS = 1000 / 3600;

	Distance.kMHToMS = function (kMH)
	{
		return kMH * Distance.KMH_MS;
	};

	Distance.mSToKMH =function (mS)
	{
		return mS / Distance.KMH_MS;
	};
});